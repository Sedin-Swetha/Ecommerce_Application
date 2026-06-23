import { atom } from "jotai";
import { cartStorage } from "@/lib/storage/cart";
import { CartItem } from "@/types/product";
export const cartAtom = atom<CartItem[]>(cartStorage.get());
export const cartAtomWithSync = atom(
  (get) => get(cartAtom),
  (_get, set, newCart: CartItem[]) => {
    set(cartAtom, newCart);
    cartStorage.set(newCart);
  }
);
export const cartCountAtom = atom((get) =>
  get(cartAtom).reduce((sum, i) => sum + i.quantity, 0)
);