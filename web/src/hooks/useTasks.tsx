import { useContext } from "react";
import { TasksContext, TasksContextProps } from "../context/tasks";

export function useCategories(): TasksContextProps {
  const context = useContext(TasksContext);
  return context;
}
