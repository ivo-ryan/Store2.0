"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { CartProduct, userService } from "@/services/userService";

import styles from "./styles.module.scss";
import Loading from "../loading/loading";
import SkeletonCard from "../skeletonCard";

interface AuthContextProps {
  user: { email: string } | null;
  productsCart: CartProduct[];
  token: string | null;
  loading: boolean;
  setCartChange: React.Dispatch<React.SetStateAction<boolean>>;
  setProductsCart: React.Dispatch<React.SetStateAction<CartProduct[]>>
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  registerUser: (name: string, email: string, password: string) => Promise<{register: boolean}>;
  handleClickAddProductInCart: (productId: number, change?: number) => Promise<void>;
  handleClickRemoveProductInCart: (productId : string) => Promise<void>;

}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [ user, setUser ] = useState<{ email: string } | null>(null);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ cartChange, setCartChange ] = useState<boolean>(false);
  const [ token, setToken ] = useState<string | null>(null);
  const [productsCart, setProductsCart] = useState<CartProduct[]>([]);
  const [isMounted, setIsMounted] = useState(false); 
  const [ isLogout, setIsLogout ] = useState(false);
  const router = useRouter();


    const refreshCart = async () => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) return;

    try{
      setLoading(true);
      const res = await userService.getProductsInCart();
      setProductsCart(res);
    }
    finally{
      setLoading(false);
    }

  };

  const handleClickAddProductInCart = async ( productId: number, change: number = 1 ) => {
        const storedUser = sessionStorage.getItem("user");

        if(!storedUser) return 

        try{
          setLoading(true);
          await userService.addProductInCart(productId, change);
          setCartChange(prev => !prev);

        }
        finally{
          setLoading(false);
        }
    };


  const handleClickRemoveProductInCart = async (productId: string) => {
        const storedUser = sessionStorage.getItem("user");

        if(!storedUser) return 

        try{
          setLoading(true);
          await userService.deleteProductInCart(productId);
          setCartChange(prev => !prev);
        }
        finally{
          setLoading(false);
        }
    }

  useEffect(() => {
    refreshCart();
  }, [cartChange]);


  useEffect(() => {
        setIsMounted(true);
        const token = sessionStorage.getItem("token");
        const userJson = sessionStorage.getItem("user");
        if (token) {
          setIsLogout(false);
          setToken(token);
        }
    
        if (token && userJson) {
          setUser(JSON.parse(userJson));
        }

  }, [isLogout]);

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
    if(!user) return;

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsLogout(true);
    setCartChange(prev => !prev)
    router.push("/");
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
    return (
      <>
        <div className={styles.container}><Loading/></div>
        <div className={styles.grid}>{ Array.from({ length: 10 }).map((_, i) =><SkeletonCard key={i} />) }</div>
      </>
    )
  }

  return (
    <AuthContext.Provider value={{ 
      user,
      token,
      isAuthenticated: !!token, 
      login, 
      logout , 
      registerUser, 
      productsCart, 
      setCartChange, 
      setProductsCart,
      loading, 
      handleClickAddProductInCart,
      handleClickRemoveProductInCart
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
