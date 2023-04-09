import { MealRequest, MealParams } from "@/types/dish";
import {
  Card,
  CardHeader,
  capitalize,
  CardContent,
  List,
  ListItem,
  Typography,
  Slider,
  Checkbox,
  Button,
} from "@mui/material";
import React from "react";

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
    carbs: (meal.calories * 20) / 100,
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
    <Card className="w-full max-w-sm">
      <CardHeader title={capitalize(meal.type)} className="pb-0" />
      <CardContent className="p-2">
        <List>
          <ListItem className="flex flex-col gap-2 items-start">
            <Typography variant="subtitle1">Calories</Typography>
            <Slider
              min={50}
              max={700}
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
                  <Typography>{capitalize(value)}</Typography>
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
      <div className="p-2 flex gap-2 justify-end pt-0">
        <Button size="medium" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </Card>
  );
};
