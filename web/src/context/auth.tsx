import { createContext, ReactNode, useState } from "react";

export interface AuthContextProps {
  isLoading: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
