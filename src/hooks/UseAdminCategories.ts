"use client";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { categoriesAtom } from "@/store/CategoryAtom";
import { adminCategoryService } from "@/services/adminCategoryService";
import { AdminCategoryForm } from "@/types/admin";
import { Category } from "@/lib/storage/categories";
export function useAdminCategories() {
  const [categories, setCategories] = useAtom(categoriesAtom);
  const addCategory = useCallback(
    (form: AdminCategoryForm): Category => {
      const newCategory = adminCategoryService.add(form);
      setCategories((prev) => [...prev, newCategory]);
      return newCategory;
    },
    [setCategories]
  );
  const updateCategory = useCallback(
    (id: string, form: Partial<AdminCategoryForm>): Category | null => {
      const updated = adminCategoryService.update(id, form);
      if (updated) {
        setCategories((prev) =>
          prev.map((c) => (c.id === id ? updated : c))
        );
      }
      return updated;
    },
    [setCategories]
  );
  const deleteCategory = useCallback(
    (id: string): { success: boolean; message: string } => {
      const result = adminCategoryService.delete(id);
      if (result.success) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
      }
      return result;
    },
    [setCategories]
  );
  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    productCounts: adminCategoryService.getProductCounts(),
    totalCount: categories.length,
  };
}
