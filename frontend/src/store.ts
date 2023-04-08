import { create } from "zustand";
import { MealRequest, MealType, ResultMeal } from "./types/dish";

interface MenuStore {
  meals: MealRequest[];
  setCalories: (index: number, value: number) => void;
  setCarbs: (index: number, value: number) => void;
  setFat: (index: number, value: number) => void;
  setProtein: (index: number, value: number) => void;
  addMeal: (type: MealType) => void;
  removeMeal: (index: number) => void;
}

export const useMenuStore = create<MenuStore>()((set) => ({
  meals: [],
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
  addMeal(type) {
    set((state) => ({
      meals: [
        ...state.meals,
        { type, calories: 0, carbs: -1, fat: -1, protein: -1 },
      ],
    }));
  },
  removeMeal(index: number) {
    set((state) => ({
      meals: state.meals.filter((_, i) => i !== index),
    }));
  },
}));

interface MealStore {
  meals: ResultMeal[];
  setMeals: (value: ResultMeal[]) => void;
}

export const useMealStore = create<MealStore>()((set) => ({
  meals: [],
  setMeals(value) {
    set({ meals: value });
  },
}));
