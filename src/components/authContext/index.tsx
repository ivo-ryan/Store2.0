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
  const [ user, setUser ] = useState<{ email: string } | null>(null);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ token, setToken ] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false); 
  const router = useRouter();


  useEffect(() => {
        setIsMounted(true);
        const token = sessionStorage.getItem("token");
        const userJson = sessionStorage.getItem("user");
        if (token) {
          setToken(token);
        }
    
        if (token && userJson) {
          setUser(JSON.parse(userJson));
        }

  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await userService.login(email, password);
      setLoading(false);

      const data = await res.data;

      if (res.status !== 200 || !data.authenticated) {
        throw new Error("Credenciais inválidas");
      }

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify({ email }));

      setToken(data.token);
      setUser({ email });

      router.push("/");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  const registerUser = async  (name: string , email: string, password: string) => {
    setLoading(true);
    const res = await userService.register(name, email, password);
    setLoading(false)

    if(res.status !== 201 ){
      throw new Error("Credenciais inválidas");
    }

    return { register: true }

  }

  if (!isMounted) {
    return <p>Carregando sessão...</p>;
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout , registerUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
