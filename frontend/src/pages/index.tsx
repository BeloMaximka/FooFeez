import { CreateMealRequestCard, MealCard } from "@/components/Meal/MealCard";
import { useBreakfastStore } from "@/store";
import { mockResultDish } from "@/types/dish";
import { Container } from "@mui/material";

export default function Home() {
  const breakfastStore = useBreakfastStore();

  return (
    <Container maxWidth="lg" className="bg-gray-200 min-h-screen px-6 py-4">
      <CreateMealRequestCard
        meal={breakfastStore.value}
        onCaloriesChange={breakfastStore.setCalories}
        onCarbsChange={breakfastStore.setCarbs}
        onFatChange={breakfastStore.setFat}
        onProteinChange={breakfastStore.setProtein}
      />
    </Container>
  );
}
