"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./styles.module.scss";
import { FiSearch } from "react-icons/fi";

const searchSchema = z.object({
  query: z.string().min(1),
});

type SearchFormData = z.infer<typeof searchSchema>;

export default function SearchBar({
  onSearch,
  onSubmitSearch,
}: {
  onSearch: (query: string) => void;
  onSubmitSearch?: (query: string) => void;
}) {

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: SearchFormData) => {
    if (onSubmitSearch) {
      onSubmitSearch(data.query);
      reset();
    }
  };

  const registerResult = register("query");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.searchBox}>
      <input
        type="text"
        placeholder="Buscar produtos..."
        {...registerResult}
       onChange={(e) => {
          if (typeof registerResult.onChange === "function") {
            registerResult.onChange(e);
          }
          onSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }
        }}
        
      />
      <button type="submit">
        <FiSearch />
      </button>
      
     
    </form>
  );
}
