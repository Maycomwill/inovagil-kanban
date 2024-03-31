import { createContext, ReactNode, useState } from "react";
import { Category } from "../interfaces/Categories";
import api from "../lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";

export interface CategoriesContextProps {
  isLoading: boolean;
  categories: Category[] | undefined;
  getCategories: (ownerId: string) => void;
}

export const CategoriesContext = createContext({} as CategoriesContextProps);

export function CategoriesContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[] | undefined>(
    undefined,
  );
  async function getCategories(ownerId: string) {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/categories/user/${ownerId}`);
      setCategories(data.data);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setIsLoading(false);
        return toast.error(error.response.data.message);
      }
    }
  }

  return (
    <CategoriesContext.Provider
      value={{ isLoading, categories, getCategories }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
