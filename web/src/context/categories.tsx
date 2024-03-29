import { createContext, ReactNode, useState } from "react";

export interface CategoriesContextProps {
  isLoading: boolean;
}

export const CategoriesContext = createContext({} as CategoriesContextProps);

export function CategoriesContextProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <CategoriesContext.Provider value={{ isLoading }}>
      {children}
    </CategoriesContext.Provider>
  );
}
