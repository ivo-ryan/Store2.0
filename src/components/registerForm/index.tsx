"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useAuth } from "../customComponents/useAuth";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "./styles.module.scss";

const schema = z.object({
    name: z.string().min(4 , "Nome inválido"),
    email: z.email().min(6, "Email inválido"),
    password: z.string().min(4, "Senha inválida")
});

export type FormDataProps = z.infer<typeof schema>;

interface props {
    setIsRegisted: Dispatch<SetStateAction<boolean>>;
}


export default function RegisterForm ({ setIsRegisted }:props ) {

    const [ err, setErr ] = useState<string | null>(null);

    const { registerUser } = useAuth();

    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<FormDataProps>({
        criteriaMode: "all",
        mode: "all",
        resolver: zodResolver(schema)
    });

    const handleFormSubmit = async  ({name, email, password}: FormDataProps) => {
        try {
          const res = await registerUser(name, email , password);
          console.log(res.register)
          if(res.register) {
            return setIsRegisted(false);
          }
        } catch (error) {
            setErr("Dados inválidos")
        }
    }

    return (
        <div className={styles.containerForm}>

            <h2 className={styles.title}>Cadastre se</h2>
            <form action="submit" method="post" onSubmit={handleSubmit(handleFormSubmit)} 
               className={styles.form}
            >

                <div className={styles.inputContainer}>

                    <label >Nome</label>

                    <input type="text" {...register("name")} placeholder="Nome" />
                    {errors.name && <p className={styles.error} >{errors.name.message}</p>}
                    
                </div>

                <div className={styles.inputContainer}>

                    <label >Email</label>

                    <input type="email" {...register("email")} placeholder="Email" />
                    { errors.email && <p className={styles.error} >{errors.email.message}</p> }

                </div>

                <div className={styles.inputContainer}>

                    <label >Senha</label>

                    <input type="password" {...register("password")} placeholder="Password" />
                    { errors.password && <p className={styles.error} >{errors.password.message}</p> }

                </div>

                <div className={styles.back} onClick={() => setIsRegisted(false)}>
                        <button> {
                        isSubmitting ? "Voltando..." : "Voltar"
                    }</button>
                </div>


                { err && <p className={styles.error}>{err}</p> }

                <button className={styles.button} type="submit">Registrar</button>

            </form>
        </div>
    )
}