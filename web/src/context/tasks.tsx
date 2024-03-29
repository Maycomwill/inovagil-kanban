import { createContext, ReactNode, useState } from "react";

export interface TasksContextProps {
  isLoading: boolean;
}

export const TasksContext = createContext({} as TasksContextProps);

export function TasksContextProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <TasksContext.Provider value={{ isLoading }}>
      {children}
    </TasksContext.Provider>
  );
}
