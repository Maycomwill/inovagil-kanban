import { createContext, ReactNode, useState } from "react";

export interface UserContextProps {
  isLoading: boolean;
}

export const UserContext = createContext({} as UserContextProps);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <UserContext.Provider value={{ isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
