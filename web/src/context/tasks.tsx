import { AxiosError } from "axios";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";
import api from "../lib/axios";

export interface TasksContextProps {
  taskLoading: boolean;
  patchTask: ({ id, categoryId }: { id: string; categoryId: string }) => void;
  deleteTask: (id: string) => void;
  createTask: ({
    name,
    categoryId,
  }: {
    name: string;
    categoryId: string;
  }) => void;
}

export const TasksContext = createContext({} as TasksContextProps);

export function TasksContextProvider({ children }: { children: ReactNode }) {
  const [taskLoading, setTaskLoading] = useState(false);

  async function patchTask({
    id,
    categoryId,
  }: {
    id: string;
    categoryId: string;
  }) {
    setTaskLoading(true);
    try {
      const { data } = await api.patch("/tasks", {
        id,
        categoryId,
      });

      setTaskLoading(false);
      return toast.success(data.message);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setTaskLoading(false);
        return toast.error(error.response.data.message);
      }
    }
  }

  async function deleteTask(id: string) {
    setTaskLoading(true);
    try {
      const { data } = await api.delete(`/tasks/${id}`);

      setTaskLoading(false);
      toast.success(data.message);
      return;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setTaskLoading(false);
        return toast.error(error.response.data.message);
      }
    }
    console.log("Task id", id);
  }

  async function createTask({
    name,
    categoryId,
  }: {
    name: string;
    categoryId: string;
  }) {
    if (name.length <= 2) {
      return toast.warning(
        "A tarefa deve ter um nome com ao menos 3 catacteres",
      );
    }
    if(categoryId === ""){
      return toast.warning("Você deve selecionar uma categoria para a tarefa")
    }
    setTaskLoading(true);
    try {
      const { data } = await api.post("/tasks", {
        name,
        categoryId,
      });
      setTaskLoading(false);
      toast.success(data.message);
      return setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setTaskLoading(false);
        return toast.error(error.response.data.message);
      }
    }
  }

  return (
    <TasksContext.Provider
      value={{ taskLoading, patchTask, deleteTask, createTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}
