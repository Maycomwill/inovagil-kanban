import { useContext } from "react";
import { UserContextProps, UserContext } from "../context/user";

export function useUser(): UserContextProps {
  const context = useContext(UserContext);
  return context;
}
