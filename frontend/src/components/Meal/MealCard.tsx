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
import { ResultMeal } from "@/types/dish";
import { Box, capitalize } from "@mui/material";
import { useQuery } from "react-query";

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
  console.log(data);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    !data && refetch();
  };

  return (
    <Card className="max-w-sm w-full h-max">
      {/* <CardHeader title={`${capitalize(meal.mealType)}: ${meal.title}`} /> */}
      <CardHeader
        title={
          <>
            <Typography variant="h4" fontWeight="bold">
              {capitalize(meal.mealType)}
            </Typography>
            <Typography variant="h5">{meal.title}</Typography>
          </>
        }
      />
      <CardMedia component="img" height="194" image={meal.image} alt="Dish" />
      <CardContent>
        <Typography variant="subtitle1" color="text.secondary">
          {`${meal.calories} calories`}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          className="flex flex-col"
        >
          <span>Fat: {meal.fat}</span>
          <span>Carbons: {meal.carbs}</span>
          <span>Protein: {meal.protein}</span>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography>See recipe</Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="p-4">
          {!isLoading && data ? (
            <MealRecipe recipe={data} />
          ) : (
            <Typography paragraph>Loading...</Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

const MealRecipe: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
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
              <Typography>{i.original}</Typography>
            </li>
          ))}
        </ol>
      </div>
    </Box>
  );
};
