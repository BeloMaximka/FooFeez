export type MealType = "breakfast" | "lunch" | "dinner";
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
  carbs: number;
  fat: number;
  protein: number;
}

export const mockResultDish: ResultMeal[] = [
  {
    calories: 210,
    carbs: "43g",
    fat: "3g",
    image: "https://spoonacular.com/recipeImages/90629-312x231.jpg",
    protein: "1g",
    title: "Baked Apples in White Wine",
    mealType: "breakfast",
  },
  {
    calories: 226,
    carbs: "33g",
    fat: "10g",
    image: "https://spoonacular.com/recipeImages/284420-312x231.jpg",
    protein: "2g",
    title: "Chocolate Silk Pie with Marshmallow Meringue",
    mealType: "lunch",
  },
  {
    calories: 226,
    carbs: "33g",
    fat: "10g",
    image: "https://spoonacular.com/recipeImages/284420-312x231.jpg",
    protein: "2g",
    title: "Chocolate Silk Pie with Marshmallow Meringue",
    mealType: "dinner",
  },
];
