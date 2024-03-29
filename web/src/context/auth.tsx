import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

export interface AuthContextProps {
  isLoading: boolean;
  auth: boolean;
  login: ({ email, password }: { email: string; password: string }) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    verify();
  }, []);

  async function verify() {
    setIsLoading(true);
    const localStorageToken = localStorage.getItem("token");

    if (localStorageToken && localStorageToken !== null) {
      try {
        const { data } = await api.post("/auth/verify", {
          token: localStorageToken,
        });

        if (!data.status) {
          localStorage.removeItem("token");
          setAuth(false);
          setIsLoading(false);
          return;
        }
        setAuth(true);
        setIsLoading(false);
        return;
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          localStorage.removeItem("token");
          setAuth(false);
          return;
        }
      }
    }
    setIsLoading(false);
    return setAuth(false);
  }

  async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setIsLoading(true);
    try {
      const { data, status } = await api.post("/auth", {
        email,
        password,
      });
      if (status !== 200) {
        setIsLoading(false);
        return toast.error(data.message);
      }
      setAuth(true);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("userData", data.data.user.id);
      setIsLoading(false);
      return toast.success(data.message);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setIsLoading(false);
        return toast.error(error.response.data.message);
      }
    }
  }

  function logout() {
    setAuth(false);
    localStorage.removeItem("token");
    setIsLoading(false);
    return;
  }

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, auth }}>
      {children}
    </AuthContext.Provider>
  );
}
