"use client";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { productsAtom } from "@/store/ProductAtom";
import { adminProductService } from "@/services/adminProductService";
import { AdminProductForm } from "@/types/admin";
import { Product } from "@/types/product";
export function useAdminProducts() {
  const [products, setProducts] = useAtom(productsAtom);
  const addProduct = useCallback(
    (form: AdminProductForm): Product => {
      const newProduct = adminProductService.add(form);
      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    },
    [setProducts]
  );
  const updateProduct = useCallback(
    (id: string, form: Partial<AdminProductForm>): Product | null => {
      const updated = adminProductService.update(id, form);
      if (updated) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? updated : p))
        );
      }
      return updated;
    },
    [setProducts]
  );
  const deleteProduct = useCallback(
    (id: string): boolean => {
      const success = adminProductService.delete(id);
      if (success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
      return success;
    },
    [setProducts]
  );
  const toggleFeatured = useCallback(
    (id: string): Product | null => {
      const updated = adminProductService.toggleFeatured(id);
      if (updated) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? updated : p))
        );
      }
      return updated;
    },
    [setProducts]
  );
  const updateStock = useCallback(
    (id: string, stock: number): Product | null => {
      const updated = adminProductService.updateStock(id, stock);
      if (updated) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? updated : p))
        );
      }
      return updated;
    },
    [setProducts]
  );
  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleFeatured,
    updateStock,
    lowStockProducts: adminProductService.getLowStock(),
    totalCount: products.length,
  };
}
