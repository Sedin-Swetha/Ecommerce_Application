"use client";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { productsAtom } from "@/store/ProductAtom";
import { AdminProductForm } from "@/types/admin";
import { Product } from "@/types/product";
import { STORAGE_KEYS } from "@/constants/StorageKeys";
import { defaultProducts } from "@/data/products";
function saveToStorage(products: Product[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch {
    console.error("[useAdminProducts] Failed to save to localStorage");
  }
}
export function useAdminProducts() {
  const [products, setProducts] = useAtom(productsAtom);
  const syncUpdate = useCallback(
    (updater: (prev: Product[]) => Product[]) => {
      setProducts((prev) => {
        const next = updater(prev);
        saveToStorage(next);   
        return next;           
      });
    },
    [setProducts]
  );
  const addProduct = useCallback(
    (form: AdminProductForm): Product => {
      const newProduct: Product = {
        ...form,
        id: `PRD${Date.now()}`,
        rating: 0,
        createdAt: new Date().toISOString(),
      };
      syncUpdate((prev) => [...prev, newProduct]);
      return newProduct;
    },
    [syncUpdate]
  );
  const updateProduct = useCallback(
    (id: string, form: Partial<AdminProductForm>): Product | null => {
      let updated: Product | null = null;
      syncUpdate((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          updated = { ...p, ...form };
          return updated;
        })
      );
      return updated;
    },
    [syncUpdate]
  );
  const deleteProduct = useCallback(
    (id: string): boolean => {
      let deleted = false;
      syncUpdate((prev) => {
        const next = prev.filter((p) => p.id !== id);
        deleted = next.length < prev.length;
        return next;
      });
      return deleted;
    },
    [syncUpdate]
  );
  const toggleFeatured = useCallback(
    (id: string): Product | null => {
      let updated: Product | null = null;
      syncUpdate((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          updated = { ...p, isFeatured: !p.isFeatured };
          return updated;
        })
      );
      return updated;
    },
    [syncUpdate]
  );
  const updateStock = useCallback(
    (id: string, stock: number): Product | null => {
      let updated: Product | null = null;
      syncUpdate((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          updated = { ...p, stock };
          return updated;
        })
      );
      return updated;
    },
    [syncUpdate]
  );
  const adjustStock = useCallback(
    (id: string, delta: number): Product | null => {
      let updated: Product | null = null;
      syncUpdate((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          updated = { ...p, stock: Math.max(0, p.stock + delta) };
          return updated;
        })
      );
      return updated;
    },
    [syncUpdate]
  );
  const resetToDefaults = useCallback(() => {
    syncUpdate(() => defaultProducts);
  }, [syncUpdate]);

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleFeatured,
    updateStock,
    adjustStock,
    resetToDefaults,
    lowStockProducts: products.filter((p) => p.stock <= 10),
    totalCount: products.length,
  };
}