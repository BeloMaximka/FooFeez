export const mealTypes = ["breakfast", "lunch", "dinner", "snack"];
export type MealType = typeof mealTypes[number];
export type MealParams = "calories" | "carbs" | "fat" | "protein";

export interface ResultMeal {
  id: number;
  title: string;
  image: string;
  calories: number;
  carbs: string;
  fat: string;
  protein: string;
  amountMultiplier: number;
  mealType: MealType;
}

export interface MealRequest {
  type: MealType;
  calories: number;
  carbs?: number;
  fat?: number;
  protein?: number;
}
