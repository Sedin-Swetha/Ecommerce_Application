import { atom } from "jotai";
import { getCategories, Category } from "@/lib/storage/categories";
export const categoriesAtom = atom<Category[]>(getCategories());
export const categoryByIdAtom = (id: string) =>
  atom((get) => get(categoriesAtom).find((c) => c.id === id) ?? null);
