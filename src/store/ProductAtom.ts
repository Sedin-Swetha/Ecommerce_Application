import { atom } from "jotai";
import { atomFamily } from "jotai-family";
import { defaultProducts } from "@/data/products";
import { Product } from "@/types/product";
export const productsAtom = atom<Product[]>(defaultProducts);
export const productsByCategoryAtom = atomFamily((categoryId: string) =>
	atom((get) => get(productsAtom).filter((p) => p.categoryId === categoryId))
);
export const featuredProductsAtom = atom((get) =>
	get(productsAtom).filter((p) => p.isFeatured)
);
export const searchProductsAtom = atomFamily((query: string) =>
	atom((get) => {
		const q = query.toLowerCase().trim();
		if (!q) return get(productsAtom);
		return get(productsAtom).filter(
			(p) =>
				p.name.toLowerCase().includes(q) ||
				p.brand.toLowerCase().includes(q) ||
				p.description.toLowerCase().includes(q)
		);
	})
);
export const productByIdAtom = atomFamily((id: string) =>
	atom((get) => get(productsAtom).find((p) => p.id === id) ?? null)
);
export const vendorProductsAtom = atomFamily((vendorId: string) =>
	atom((get) => get(productsAtom).filter((p) => p.vendorId === vendorId))
);