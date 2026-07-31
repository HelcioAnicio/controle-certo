"use client";

import { createContext, useContext } from "react";
import type { Category, Subcategory } from "@/prisma/categories";

type CategoriesContextValue = {
  categories: Category[];
  subcategories: Subcategory[];
};

const CategoriesContext = createContext<CategoriesContextValue | null>(null);

export function CategoriesProvider({
  categories,
  subcategories,
  children,
}: CategoriesContextValue & { children: React.ReactNode }) {
  return (
    <CategoriesContext.Provider value={{ categories, subcategories }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const ctx = useContext(CategoriesContext);
  if (!ctx) throw new Error("useCategories must be used within CategoriesProvider");
  return ctx;
}
