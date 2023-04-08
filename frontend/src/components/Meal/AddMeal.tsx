import { MealType, mealTypes } from "@/types/dish";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  capitalize,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

type Props = {
  value?: MealType;
  setValue: (value: MealType) => void;
  onAdd: () => void;
};

export const AddMeal = ({ value, setValue, onAdd }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2} marginBottom={4}>
      <FormControl className="w-64">
        <InputLabel id="meal-type-select-label">Meal type</InputLabel>
        <Select
          labelId="meal-type-select-label"
          id="meal-type-select"
          value={value ?? ""}
          label="Meal type"
          onChange={handleChange}
        >
          {mealTypes.map((type, i) => (
            <MenuItem key={i} value={type}>
              {capitalize(type)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        size="medium"
        variant="outlined"
        className="w-max"
        onClick={onAdd}
      >
        Create
      </Button>
    </Box>
  );
};
