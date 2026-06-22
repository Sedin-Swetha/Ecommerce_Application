import { atom } from "jotai";
import { CartItem } from "@/types/product";
export const cartAtom = atom<CartItem[]>([]);
export const cartCountAtom = atom((get) =>
  get(cartAtom).reduce((sum, i) => sum + i.quantity, 0)
);
