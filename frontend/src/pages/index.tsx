import { AddMeal } from "@/components/Meal/AddMeal";
import { MealsList } from "@/components/Meal/MealsList";
import { MealsRequestList } from "@/components/Meal/MealsRequestList";
import { useMealStore, useMenuStore } from "@/store";
import { MealRequest, MealType } from "@/types/dish";
import { Box, Button, Container, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";

const fetchMeals = (meals: MealRequest[]) =>
  fetch("https://localhost:7176/api/meals", {
    body: JSON.stringify(
      meals.map((m) => ({
        type: m.type,
        calories: m.calories,
        carbs: m.carbs === -1 ? undefined : m.carbs,
        fat: m.fat === -1 ? undefined : m.fat,
        protein: m.protein === -1 ? undefined : m.protein,
      }))
    ),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

export default function Home() {
  const { meals, addMeal, ...funcs } = useMenuStore();
  const mealsDishes = useMealStore((s) => s.meals);
  const setMeals = useMealStore((s) => s.setMeals);
  const [mealType, setMealType] = useState<MealType>();
  const [tabIndex, setTabIndex] = useState(0);
  const [isLoding, setIsLoading] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const mutation = useMutation(
    () => {
      setIsLoading(true);
      return fetchMeals(meals);
    },
    {
      async onSuccess(data) {
        const response = await data.json();
        setMeals(response);
        setTabIndex(1);
        setIsLoading(false);
      },
    }
  );

  const onAddMeal = () => mealType && addMeal(mealType);
  const getMeals = () => mutation.mutate();

  return (
    <Container
      maxWidth="xl"
      sx={{ backgroundColor: "Window" }}
      className="bg-gray-200 min-h-screen px-6 py-4"
    >
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            aria-label="main app tabs"
            variant="fullWidth"
          >
            <Tab label="Select menu" {...a11yProps(0)} />
            <Tab label="View meal" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0}>
          <AddMeal value={mealType} setValue={setMealType} onAdd={onAddMeal} />
          <MealsRequestList meals={meals} {...funcs} />
          <Button
            size="large"
            variant="outlined"
            className="w-max mt-4"
            onClick={getMeals}
          >
            {isLoding ? "Loading..." : "Get recipes"}
          </Button>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <MealsList meals={mealsDishes} />
        </TabPanel>
      </Box>
    </Container>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}
