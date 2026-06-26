import { Product } from "@/types/product";
import { defaultProducts } from "@/data/products";
import { STORAGE_KEYS } from "@/constants/StorageKeys";
export function getProducts(): Product[] {
  if (typeof window === "undefined") return defaultProducts;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) return defaultProducts;
    const parsed: Product[] = JSON.parse(raw);
    return parsed.length > 0 ? parsed : defaultProducts;
  } catch {
    return defaultProducts;
  }
}
export function saveProducts(products: Product[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch {
    console.error("[storage] Failed to save products");
  }
}
export function addProduct(product: Omit<Product, "id" | "createdAt">): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: `PRD${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  saveProducts([...products, newProduct]);
  return newProduct;
}
export function updateProduct(
  id: string,
  updates: Partial<Omit<Product, "id" | "createdAt">>
): Product | null {
  const products = getProducts();
  let updated: Product | null = null;
  const next = products.map((p) => {
    if (p.id !== id) return p;
    updated = { ...p, ...updates };
    return updated;
  });
  if (updated) saveProducts(next);
  return updated;
}
export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const next = products.filter((p) => p.id !== id);
  if (next.length === products.length) return false;
  saveProducts(next);
  return true;
}
export function seedProducts(): void {
  saveProducts(defaultProducts);
}
