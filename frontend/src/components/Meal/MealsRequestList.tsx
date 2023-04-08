import { Box } from "@mui/material";
import React from "react";
import { CreateMealRequestCard } from "./MealCard";
import { MealRequest } from "@/types/dish";

type Props = {
  meals: MealRequest[];
  setCalories: (index: number, value: number) => void;
  setCarbs: (index: number, value: number) => void;
  setFat: (index: number, value: number) => void;
  setProtein: (index: number, value: number) => void;
  removeMeal: (index: number) => void;
};

export const MealsRequestList = ({
  meals,
  removeMeal,
  setCalories,
  setCarbs,
  setFat,
  setProtein,
}: Props) => {
  return (
    <Box display={"flex"} flexWrap={"wrap"} gap={4}>
      {meals.map((m, i) => (
        <CreateMealRequestCard
          key={i}
          meal={m}
          onCaloriesChange={(value) => setCalories(i, value)}
          onCarbsChange={(value) => setCarbs(i, value)}
          onFatChange={(value) => setFat(i, value)}
          onProteinChange={(value) => setProtein(i, value)}
          onRemove={() => removeMeal(i)}
        />
      ))}
    </Box>
  );
};
