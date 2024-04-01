import { createContext, ReactNode, useState } from "react";
import api from "../lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { UserData } from "../interfaces/User";

export interface UserContextProps {
  isLoading: boolean;
  data: UserData | undefined;
  getUserData: () => void;
  createUser: (data: SignupProps) => void;
}

interface SignupProps {
  name: string;
  email: string;
  password: string;
  repassword: string;
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

  async function createUser(data: SignupProps) {
    const { name, email, password, repassword } = data;
    if (password !== repassword) {
      return toast.warning("As senhas devem ser idênticas");
    }
    if (password.length <= 5) {
      return toast.info("A senha deve ter no mínimo 6 caracteres");
    }
    if (name === "" || email === "") {
      return toast.warning("O nome e email são obrigatórios");
    }

    setIsLoading(true);
    try {
      const { data } = await api.post("/user", {
        name,
        email,
        password,
      });
      setIsLoading(false);
      toast.success(data.message);
      return setTimeout(() => {
        location.replace("/");
      }, 1000);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setIsLoading(false);
        return toast.error(error.response.data.message);
      }
    }
  }

  return (
    <UserContext.Provider value={{ isLoading, data, getUserData, createUser }}>
      {children}
    </UserContext.Provider>
  );
}
