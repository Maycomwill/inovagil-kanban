import { useContext } from "react";
import {
  CategoriesContext,
  CategoriesContextProps,
} from "../context/categories";

export function useCategories(): CategoriesContextProps {
  const context = useContext(CategoriesContext);
  return context;
}
