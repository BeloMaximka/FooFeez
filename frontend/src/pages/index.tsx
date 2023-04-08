import { CreateMealRequestCard, MealCard } from "@/components/Meal/MealCard";
import { useMenuStore } from "@/store";
import { mockResultDish } from "@/types/dish";
import { Container } from "@mui/material";

export default function Home() {
  const { meals, setCalories, setCarbs, setFat, setProtein } = useMenuStore();

  return (
    <Container maxWidth="lg" className="bg-gray-200 min-h-screen px-6 py-4">
      {meals.map((m, i) => (
        <CreateMealRequestCard
          key={m.type}
          meal={m}
          onCaloriesChange={(value) => setCalories(i, value)}
          onCarbsChange={(value) => setCarbs(i, value)}
          onFatChange={(value) => setFat(i, value)}
          onProteinChange={(value) => setProtein(i, value)}
        />
      ))}
    </Container>
  );
}
