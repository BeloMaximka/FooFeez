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
  amount: number;
  name: string;
  unit: string;
  original: string;
  originalName: string;
}
