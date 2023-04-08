import { create } from "zustand";
import { MealRequest } from "./types/dish";

interface MenuStore {
  meals: MealRequest[];
  setCalories: (index: number, value: number) => void;
  setCarbs: (index: number, value: number) => void;
  setFat: (index: number, value: number) => void;
  setProtein: (index: number, value: number) => void;
}

export const useMenuStore = create<MenuStore>()((set) => ({
  meals: [
    {
      type: "breakfast",
      calories: 50,
      carbs: 0,
      fat: 0,
      protein: 0,
    },
  ],
  setCalories(index, value) {
    set((state) => {
      const meal: MealRequest = { ...state.meals[index], calories: value };
      return {
        meals: [
          ...state.meals.slice(0, index),
          meal,
          ...state.meals.slice(index + 1),
        ],
      };
    });
  },
  setCarbs(index, value) {
    set((state) => {
      const meal: MealRequest = { ...state.meals[index], carbs: value };
      return {
        meals: [
          ...state.meals.slice(0, index),
          meal,
          ...state.meals.slice(index + 1),
        ],
      };
    });
  },
  setFat(index, value) {
    set((state) => {
      const meal: MealRequest = { ...state.meals[index], fat: value };
      return {
        meals: [
          ...state.meals.slice(0, index),
          meal,
          ...state.meals.slice(index + 1),
        ],
      };
    });
  },
  setProtein(index, value) {
    set((state) => {
      const meal: MealRequest = { ...state.meals[index], protein: value };
      return {
        meals: [
          ...state.meals.slice(0, index),
          meal,
          ...state.meals.slice(index + 1),
        ],
      };
    });
  },
}));
