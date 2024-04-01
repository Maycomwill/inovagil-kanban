import { ReactNode } from "react";
import { AuthContextProvider } from "../context/auth";
import { UserContextProvider } from "../context/user";
import { CategoriesContextProvider } from "../context/categories";
import { TasksContextProvider } from "../context/tasks";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <CategoriesContextProvider>
          <TasksContextProvider>{children}</TasksContextProvider>
        </CategoriesContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}
