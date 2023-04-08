import { CreateMealRequestCard } from "@/components/Meal/MealCard";
import { useMenuStore } from "@/store";
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

export default function Home() {
  const {
    meals,
    setCalories,
    setCarbs,
    setFat,
    setProtein,
    addMeal,
    removeMeal,
  } = useMenuStore();
  const [mealType, setMealType] = useState<MealType>();

  const handleChange = (event: SelectChangeEvent) => {
    setMealType(event.target.value as string);
  };

  const mutation = useMutation(
    (meals: MealRequest[]) =>
      fetch("https://localhost:7176/api/meals", {
        body: JSON.stringify(meals),
        method: "POST",
      }),
    {
      async onSuccess(data, variables, context) {
        console.log(data.json());
      },
    }
  );

  return (
    <Container maxWidth="lg" className="bg-gray-200 min-h-screen px-6 py-4">
      <Box display={"flex"} flexDirection={"column"} gap={2} marginBottom={4}>
        <FormControl className="w-64">
          <InputLabel id="meal-type-select-label">Meal type</InputLabel>
          <Select
            labelId="meal-type-select-label"
            id="meal-type-select"
            value={mealType ?? ""}
            label="Meal type"
            onChange={handleChange}
          >
            {mealTypes.map((type, i) => (
              <MenuItem key={i} value={type}>
                {capitalize(type)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          size="medium"
          variant="outlined"
          className="w-max"
          onClick={() => mealType && addMeal(mealType)}
        >
          Create
        </Button>
      </Box>
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
      <Button
        size="large"
        variant="outlined"
        className="w-max mt-4"
        onClick={() => mutation.mutate(meals)}
      >
        Get recipes
      </Button>
    </Container>
  );
}
