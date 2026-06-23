import { atom } from "jotai";
import { wishlistStorage } from "@/lib/storage/wishlist";
export const wishlistAtom = atom<string[]>(wishlistStorage.get());
export const wishlistAtomWithSync = atom(
  (get) => get(wishlistAtom),
  (_get, set, newList: string[]) => {
    set(wishlistAtom, newList);
    wishlistStorage.set(newList);
  }
);
export const wishlistCountAtom = atom((get) => get(wishlistAtom).length);