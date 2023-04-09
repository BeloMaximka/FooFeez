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
import { MealParams, MealRequest, ResultMeal } from "@/types/dish";
import {
  Button,
  Checkbox,
  List,
  ListItem,
  Slider,
  capitalize,
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
      <CardHeader title={`${capitalize(meal.mealType)}: ${meal.title}`} />
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
        <CardContent>
          <Typography paragraph>Method:</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

interface CreateMealRequestCardProps {
  meal: MealRequest;
  onCaloriesChange: (value: number) => void;
  onCarbsChange: (value?: number) => void;
  onFatChange: (value?: number) => void;
  onProteinChange: (value?: number) => void;
  onRemove: () => void;
}

const mealParams: MealParams[] = ["carbs", "fat", "protein"];

export const CreateMealRequestCard: React.FC<CreateMealRequestCardProps> = ({
  meal,
  onCaloriesChange,
  onCarbsChange,
  onFatChange,
  onProteinChange,
  onRemove,
}) => {
  const [checked, setChecked] = React.useState<string[]>([]);

  const changeHandlers: Partial<Record<MealParams, (value?: number) => void>> =
    {
      carbs: onCarbsChange,
      fat: onFatChange,
      protein: onProteinChange,
    };

  const maxValues: Partial<Record<MealParams, number>> = {
    carbs: (meal.calories * 25) / 100,
    fat: 40,
    protein: (meal.calories * 5) / 100,
  };

  const handleToggle = (value: MealParams) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
      changeHandlers[value]?.(undefined);
    }

    setChecked(newChecked);
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader title={capitalize(meal.type)} />
      <CardContent>
        <List>
          <ListItem className="flex flex-col gap-2 items-start">
            <Typography variant="subtitle1">Calories</Typography>
            <Slider
              min={100}
              max={1000}
              value={meal.calories}
              aria-label="Default"
              valueLabelDisplay="auto"
              onChangeCommitted={(e, val) => onCaloriesChange(val as number)}
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
                    min={5}
                    max={maxValues[value]}
                    value={meal[value] ?? 0}
                    onChangeCommitted={(e, val) =>
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
        <Button size="medium" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </Card>
  );
};
