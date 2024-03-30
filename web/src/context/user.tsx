import { createContext, ReactNode, useState } from "react";
import api from "../lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Category } from "../interfaces/Categories";

export interface UserContextProps {
  isLoading: boolean;
  data: UserData | undefined
  getUserData: () => void;
}

interface UserData {
  name: string;
  email: string;
  createdAt: string;
  id: string;
  categories: Category[];
}

export const UserContext = createContext({} as UserContextProps);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<UserData | undefined>(undefined);

  async function getUserData() {
    setIsLoading(true);
    const id = localStorage.getItem("userData");
    if (id === null) {
      setIsLoading(false);
      return;
    }
    try {
      const { data } = await api.get(`/user/${id}`);
      setData(data.data);
      setIsLoading(false);
      return;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return toast.error(error.response.data.message);
      }
    }
  }

  return (
    <UserContext.Provider value={{ isLoading, data, getUserData }}>
      {children}
    </UserContext.Provider>
  );
}
