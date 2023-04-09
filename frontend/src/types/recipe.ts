interface Recipe {
  id: number;
  servings: number;
  readyInMinutes: number;
  dishTypes: string[];
  extendedIngredients: ExtendedIngredients[];
  sourceUrl: string;
  spoonacularSourceUrl: string;
  summary: string;
}

interface ExtendedIngredients {
  id: number;
  aisle: string;
  amount: number;
  original: string;
  originalName: string;
  unit: string;
}
