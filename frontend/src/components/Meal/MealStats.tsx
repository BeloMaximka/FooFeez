import { MealParams } from "@/types/dish";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  type SxProps,
  type Theme,
} from "@mui/material";
import React from "react";

type Props = { stats: Record<MealParams, number> };

const maxSaveValues: Record<MealParams, number> = {
  calories: 2500,
  carbs: 325,
  fat: 30,
  protein: 55,
};

const getCellStyle = (value: boolean): SxProps<Theme> | undefined =>
  value
    ? {
        color: "red",
        fontWeight: "bold",
        fontSize: "1rem",
      }
    : undefined;

export const MealStats = ({ stats }: Props) => {
  const isValueExceeded: Record<MealParams, boolean> = {
    calories: stats.calories >= maxSaveValues.calories,
    carbs: stats.carbs >= maxSaveValues.carbs,
    fat: stats.fat >= maxSaveValues.fat,
    protein: stats.protein >= maxSaveValues.protein,
  };

  return (
    <TableContainer component={Paper} className="mb-4">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell
              align="right"
              sx={getCellStyle(isValueExceeded.calories)}
            >
              {stats.calories}
            </TableCell>
            <TableCell align="right" sx={getCellStyle(isValueExceeded.fat)}>
              {stats.fat}
            </TableCell>
            <TableCell align="right" sx={getCellStyle(isValueExceeded.carbs)}>
              {stats.carbs}
            </TableCell>
            <TableCell align="right" sx={getCellStyle(isValueExceeded.protein)}>
              {stats.protein}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
