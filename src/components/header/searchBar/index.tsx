"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./styles.module.scss";
import { FiSearch } from "react-icons/fi";

const searchSchema = z.object({
  query: z.string().min(1, "Digite algo para buscar"),
});

type SearchFormData = z.infer<typeof searchSchema>;

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {

  const { register, handleSubmit, reset } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: SearchFormData) => {
    onSearch(data.query);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.searchBox}>
      <input
        type="text"
        placeholder="Buscar produtos..."
        {...register("query")}
      />
      <button type="submit" >
        <FiSearch />
      </button>
      
     
    </form>
  );
}
