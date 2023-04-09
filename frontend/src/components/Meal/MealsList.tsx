import { ResultMeal } from "@/types/dish";
import { Box } from "@mui/material";
import React from "react";
import { MealCard } from "./MealCard";

type Props = {
  meals: ResultMeal[];
};

export const MealsList = ({ meals }: Props) => {
  return (
    <Box display={"flex"} flexWrap={"wrap"} gap={4}>
      {meals.map((m, i) => (
        <MealCard key={m.id} meal={m} />
      ))}
    </Box>
  );
};
