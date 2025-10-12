"use client";


import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./styles.module.scss";
import { useState } from "react";
import { useAuth } from "@/components/customComponents/useAuth";
import RegisterForm from "../registerForm";

const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(4, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [ isRegisted , setIsRegisted ] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    try {
      await login(data.email, data.password);
    } catch (err) {
      setError("Email ou senha incorretos");
    }
  };

  return (
    <div className={styles.container}>
      <form className={`${styles.form} 
        ${
            isRegisted ? styles.hide : styles.show
        }
      `} 
      onSubmit={handleSubmit(onSubmit)}>
        <h2>Entrar</h2>

        <div className={styles.field}>
          <label>Email</label>
          <input type="email" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className={styles.field}>
          <label>Senha</label>
          <input type="password" {...register("password")} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.isResgisted} onClick={() => setIsRegisted(true)}>
            <p className={styles.register}>Ainda não sou cadastrado</p>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>

        {
            isRegisted && <RegisterForm setIsRegisted={setIsRegisted} />
        }
       
    </div>
  );
}
