import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { defaultCategories } from "@/data/categories";
import { Category } from "@/lib/storage/categories";
import { STORAGE_KEYS } from "@/constants/StorageKeys";

export const categoriesAtom = atomWithStorage<Category[]>(STORAGE_KEYS.CATEGORIES, defaultCategories);
export const categoryByIdAtom = (id: string) =>
	atom((get) => get(categoriesAtom).find((c) => c.id === id) ?? null);
