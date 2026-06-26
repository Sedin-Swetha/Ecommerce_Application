import { atom } from "jotai";
import { Product } from "@/types/product";
import { getProducts } from "@/lib/storage/products";
export const productsAtom = atom<Product[]>(getProducts());
export const productsByCategoryAtom = (categoryId: string) =>
  atom((get) =>
    get(productsAtom).filter((p) => p.categoryId === categoryId)
  );
export const featuredProductsAtom = atom((get) =>
  get(productsAtom).filter((p) => p.isFeatured)
);
export const searchProductsAtom = (query: string) =>
  atom((get) => {
    const q = query.toLowerCase().trim();
    if (!q) return get(productsAtom);
    return get(productsAtom).filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  });
export const productByIdAtom = (id: string) =>
  atom((get) => get(productsAtom).find((p) => p.id === id) ?? null);
