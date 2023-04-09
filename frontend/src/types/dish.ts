export const mealTypes = ["breakfast", "lunch", "dinner", "snack"];
export type MealType = typeof mealTypes[number];
export type MealParams = "calories" | "carbs" | "fat" | "protein";

export interface ResultMeal {
  title: string;
  image: string;
  calories: number;
  carbs: string;
  fat: string;
  protein: string;
  mealType: MealType;
}

export interface MealRequest {
  type: MealType;
  calories: number;
  carbs?: number;
  fat?: number;
  protein?: number;
}
