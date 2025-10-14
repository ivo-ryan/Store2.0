"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { userService } from "@/services/userService";

interface AuthContextProps {
  user: { email: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  registerUser: (name: string, email: string, password: string) => Promise<{register: boolean}>
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await userService.login(email, password);

      const data = await res.data;

      if (res.status !== 200 || !data.authenticated) {
        throw new Error("Credenciais inválidas");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ email }));

      setToken(data.token);
      setUser({ email });

      router.push("/");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  const registerUser = async  (name: string , email: string, password: string) => {
    const res = await userService.register(name, email, password);

    if(res.status !== 201 ){
      throw new Error("Credenciais inválidas");
    }

    return { register: true }

  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout , registerUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
