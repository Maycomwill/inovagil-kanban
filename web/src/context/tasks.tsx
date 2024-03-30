import { AxiosError } from "axios";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";
import api from "../lib/axios";

export interface TasksContextProps {
  isLoading: boolean;
  patchTask: ({ id, categoryId }: { id: string; categoryId: string }) => void;
}

export const TasksContext = createContext({} as TasksContextProps);

export function TasksContextProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  async function patchTask({
    id,
    categoryId,
  }: {
    id: string;
    categoryId: string;
  }) {
    setIsLoading(true);
    try {
      const { data } = await api.patch("/tasks", {
        id,
        categoryId,
      });

      setIsLoading(false);
      return toast.success(data.message);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setIsLoading(false);
        return toast.error(error.response.data.message);
      }
    }
  }

  return (
    <TasksContext.Provider value={{ isLoading, patchTask }}>
      {children}
    </TasksContext.Provider>
  );
}
