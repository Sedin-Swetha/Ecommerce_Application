import { atom } from "jotai";
import { defaultCategories } from "@/data/categories";
import { Category } from "@/lib/storage/categories";
export const categoriesAtom = atom<Category[]>(defaultCategories);
export const categoryByIdAtom = (id: string) =>
	atom((get) => get(categoriesAtom).find((c) => c.id === id) ?? null);
