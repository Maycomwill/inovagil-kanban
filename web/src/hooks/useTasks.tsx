import { useContext } from "react";
import { TasksContext, TasksContextProps } from "../context/tasks";

export function useTasks(): TasksContextProps {
  const context = useContext(TasksContext);
  return context;
}
