import { createContext, ReactNode, useState } from "react";
import { Category } from "../interfaces/Categories";
import api from "../lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";

export interface CategoriesContextProps {
  isLoading: boolean;
  categories: Category[] | undefined;
  getCategories: (ownerId: string) => void;
  createCategory: (name: string) => void;
  deleteCategory: (categoryId: string) => void;
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

  async function createCategory(name: string) {
    if (name === "" || name.length <= 2) {
      return toast.warning("A categoria precisa ter pelo menos 3 caracteres");
    }
    const ownerId = localStorage.getItem("userData");
    if (!ownerId) {
      return toast.error(
        "Você precisa estar conectado para criar uma categoria",
      );
    }
    setIsLoading(true);

    try {
      const { data } = await api.post("/categories", {
        name,
        ownerId,
      });
      setIsLoading(false);
      toast.success(data.message);
      return setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setIsLoading(false);
        return toast.error(error.response.data.message);
      }
    }
  }

  async function deleteCategory(categoryId: string) {
    if (categoryId === "") {
      return toast.warning("Categoria inválida");
    }
    setIsLoading(true);
    try {
      const { data } = await api.delete(`/categories/${categoryId}`);
      toast.success(data.message);
      setIsLoading(false);
      return setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setIsLoading(false);
        return toast.error(error.response.data.message);
      }
    }
  }

  return (
    <CategoriesContext.Provider
      value={{
        isLoading,
        categories,
        getCategories,
        createCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
