import { create } from "zustand";
import { MealRequest, MealType } from "./types/dish";

interface MenuStoreBase {
  value: MealRequest;
  setCalories: (value: number) => void;
  setCarbs: (value: number) => void;
  setFat: (value: number) => void;
  setProtein: (value: number) => void;
}

interface BreakfastStore extends MenuStoreBase {
  breakfast: MealRequest;
}

interface LunchStore extends MenuStoreBase {
  lunch: MealRequest;
}

interface DinnerStore extends MenuStoreBase {
  dinner: MealRequest;
}

export const useBreakfastStore = create<MenuStoreBase>()((set) => ({
  value: {
    type: "breakfast",
    calories: 50,
    carbs: 0,
    fat: 0,
    protein: 0,
  },
  setCalories(value) {
    set((state) => ({ value: { ...state.value, calories: value } }));
  },
  setCarbs(value) {
    set((state) => ({ value: { ...state.value, carbs: value } }));
  },
  setFat(value) {
    set((state) => ({ value: { ...state.value, fat: value } }));
  },
  setProtein(value) {
    set((state) => ({ value: { ...state.value, protein: value } }));
  },
}));
