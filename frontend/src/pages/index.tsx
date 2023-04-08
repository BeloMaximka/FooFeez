import { AddMeal } from "@/components/Meal/AddMeal";
import { CreateMealRequestCard } from "@/components/Meal/MealCard";
import { MealsRequestList } from "@/components/Meal/MealsRequestList";
import { useMealStore, useMenuStore } from "@/store";
import { MealRequest, MealType, mealTypes } from "@/types/dish";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  capitalize,
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";

const fetchMeals = (meals: MealRequest[]) =>
  fetch("https://localhost:7176/api/meals", {
    body: JSON.stringify(meals),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

export default function Home() {
  const { meals, addMeal, ...funcs } = useMenuStore();
  const setMeals = useMealStore((s) => s.setMeals);
  const [mealType, setMealType] = useState<MealType>();

  const mutation = useMutation(fetchMeals, {
    async onSuccess(data) {
      const response = await data.json();
      setMeals(response);
    },
  });

  const onAddMeal = () => mealType && addMeal(mealType);
  const getMeals = () => mutation.mutate(meals);

  return (
    <Container maxWidth="xl" className="bg-gray-200 min-h-screen px-6 py-4">
      <AddMeal value={mealType} setValue={setMealType} onAdd={onAddMeal} />
      <MealsRequestList meals={meals} {...funcs} />
      <Button
        size="large"
        variant="outlined"
        className="w-max mt-4"
        onClick={getMeals}
      >
        Get recipes
      </Button>
    </Container>
  );
}
