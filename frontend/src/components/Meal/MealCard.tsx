import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MealParams, MealRequest, MealType, ResultMeal } from "@/types/dish";
import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slider,
} from "@mui/material";

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

export const MealCard: React.FC<{ meal: ResultMeal }> = ({ meal }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={meal.title} />
      <CardMedia
        component="img"
        height="194"
        image={meal.image}
        alt="Paella dish"
      />
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

interface CreateMealRequestCardProps {
  meal: MealRequest;
  onCaloriesChange: (value: number) => void;
  onCarbsChange: (value: number) => void;
  onFatChange: (value: number) => void;
  onProteinChange: (value: number) => void;
}

const capitalize = (value: string) => {
  if (!value) return "";

  return value.charAt(0).toUpperCase() + value.slice(1);
};

const mealParams: MealParams[] = ["carbs", "fat", "protein"];

export const CreateMealRequestCard: React.FC<CreateMealRequestCardProps> = ({
  meal,
  onCaloriesChange,
  onCarbsChange,
  onFatChange,
  onProteinChange,
}) => {
  const [checked, setChecked] = React.useState<string[]>([]);

  const changeHandlers: Partial<Record<MealParams, (value: number) => void>> = {
    carbs: onCarbsChange,
    fat: onFatChange,
    protein: onProteinChange,
  };

  const handleToggle = (value: MealParams) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
      changeHandlers[value]?.(0);
    }

    setChecked(newChecked);
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader title={capitalize(meal.type)} />
      <CardContent>
        <List>
          <ListItem className="flex flex-col gap-2 items-start">
            <Typography variant="subtitle1">Calories</Typography>
            <Slider
              value={meal.calories}
              aria-label="Default"
              valueLabelDisplay="on"
              onChange={(e, val) => onCaloriesChange(val as number)}
            />
          </ListItem>
          {mealParams.map((value) => {
            const isChecked = checked.includes(value);
            return (
              <ListItem className="flex gap-3 items-center" key={value}>
                <Checkbox
                  checked={isChecked}
                  onChange={handleToggle(value)}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <div className="flex flex-col gap-2 items-start w-full">
                  <Typography variant="subtitle1">
                    {capitalize(value)}
                  </Typography>
                  <Slider
                    min={0}
                    max={100}
                    value={meal[value]}
                    onChange={(e, val) =>
                      changeHandlers[value]?.(val as number)
                    }
                    aria-label="Default"
                    valueLabelDisplay={isChecked ? "on" : "off"}
                    disabled={!isChecked}
                  />
                </div>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
      <div className="p-2 flex gap-2 justify-end">
        <Button size="medium">Remove</Button>
        <Button size="medium" variant="outlined">
          Save
        </Button>
      </div>
    </Card>
  );
};
