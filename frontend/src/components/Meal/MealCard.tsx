import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MealType, ResultMeal } from "@/types/dish";
import { Box, Link, SvgIcon, capitalize } from "@mui/material";
import { useQuery } from "react-query";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import TapasIcon from "@mui/icons-material/Tapas";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface MealCardProps {
  meal: ResultMeal;
}

const getRecipe = (id: number) =>
  fetch(`https://localhost:7176/api/recipe?id=${id}`).then((r) => r.json());

const icons: Record<MealType, React.ReactNode> = {
  breakfast: <WbSunnyIcon />,
  lunch: <LunchDiningIcon />,
  dinner: <DarkModeIcon />,
  snack: <TapasIcon />,
};

export const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const [expanded, setExpanded] = React.useState(false);

  const fetchRecipe = () => getRecipe(meal.id);
  const { data, refetch, isLoading } = useQuery<Recipe>(
    `get-recipe-${meal.id}`,
    fetchRecipe,
    {
      enabled: false,
    }
  );

  const calories = meal.calories * meal.amountMultiplier;
  const carbs = parseInt(meal.carbs) * meal.amountMultiplier;
  const fat = parseInt(meal.fat) * meal.amountMultiplier;
  const protein = parseInt(meal.protein) * meal.amountMultiplier;

  const handleExpandClick = () => {
    setExpanded(!expanded);
    !data && refetch();
  };

  return (
    <Card className="max-w-sm w-full h-max">
      <CardHeader
        title={
          <>
            <Box display={"flex"} gap={2} alignItems={"center"}>
              <SvgIcon fontSize="large">{icons[meal.mealType]}</SvgIcon>
              <Typography variant="h4" fontWeight="bold">
                {capitalize(meal.mealType)}
              </Typography>
            </Box>
            <Typography variant="h5">
              {meal.title} x{meal.amountMultiplier.toFixed(1)}
            </Typography>
          </>
        }
      />
      <CardMedia component="img" height="194" image={meal.image} alt="Dish" />
      <CardContent>
        <Typography variant="subtitle1" color="text.secondary">
          {`${calories.toFixed(0)} calories`}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          className="flex flex-col"
        >
          <span>Carbons: {`${carbs.toFixed(1)}g`}</span>
          <span>Fat: {`${fat.toFixed(1)}g`}</span>
          <span>Protein: {`${protein.toFixed(1)}g`}</span>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography>{expanded ? "Hide recipe" : "See recipe"}</Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show recipe"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="p-4">
          {!isLoading && data ? (
            <MealRecipe
              recipe={data}
              amountMultiplier={meal.amountMultiplier}
            />
          ) : (
            <Typography paragraph>Loading...</Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

interface MealRecipeProps {
  recipe: Recipe;
  amountMultiplier: number;
}

const MealRecipe: React.FC<MealRecipeProps> = ({
  recipe,
  amountMultiplier,
}) => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={4}>
      <div className="bg-gray-100 rounded-lg p-2">
        <Typography paragraph margin={0}>
          <Typography fontWeight={"bold"} component={"span"}>
            Servings:{" "}
          </Typography>
          <Typography component={"span"}>{recipe.servings}</Typography>
        </Typography>
        <Typography paragraph margin={0}>
          <Typography fontWeight={"bold"} component={"span"}>
            Ready in:{" "}
          </Typography>
          <Typography component={"span"}>
            {recipe.readyInMinutes} minutes
          </Typography>
        </Typography>
        <Typography paragraph margin={0}>
          <Typography fontWeight={"bold"} component={"span"}>
            Dish types:{" "}
          </Typography>
          <Typography component={"span"}>
            {recipe.dishTypes.join(", ")}
          </Typography>
        </Typography>
      </div>
      <div>
        <Typography fontWeight={"bold"} paragraph marginBottom={2}>
          Ingredients:
        </Typography>
        <ol className="flex flex-col gap-2">
          {recipe.extendedIngredients.map((i) => (
            <li key={i.id}>
              <Typography>{`${(i.amount * amountMultiplier).toFixed(1)} ${
                i.unit
              } ${i.name}`}</Typography>
            </li>
          ))}
        </ol>
      </div>
      <Link variant="body1" href={recipe.spoonacularSourceUrl} target="_blank">
        Go to recipe
      </Link>
    </Box>
  );
};
