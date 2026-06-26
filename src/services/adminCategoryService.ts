import {getCategories,addCategory as storageAdd,updateCategory as storageUpdate,deleteCategory as storageDelete,Category} from "@/lib/storage/categories";
import { AdminCategoryForm } from "@/types/admin";
import { getProducts } from "@/lib/storage/products";
export const adminCategoryService = {
  getAll(): Category[] {
    return getCategories();
  },
  getById(id: string): Category | null {
    return getCategories().find((c) => c.id === id) ?? null;
  },
  add(form: AdminCategoryForm): Category {
    return storageAdd(form);
  },
  update(id: string, form: Partial<AdminCategoryForm>): Category | null {
    return storageUpdate(id, form);
  },
  delete(id: string): { success: boolean; message: string } {
    const products = getProducts().filter((p) => p.categoryId === id);
    if (products.length > 0) {
      return {
        success: false,
        message: `Cannot delete — ${products.length} product(s) still use this category.`,
      };
    }
    const deleted = storageDelete(id);
    return {
      success: deleted,
      message: deleted ? "Category deleted." : "Category not found.",
    };
  },
  getProductCounts(): Record<string, number> {
    const products = getProducts();
    return getCategories().reduce<Record<string, number>>((acc, cat) => {
      acc[cat.id] = products.filter((p) => p.categoryId === cat.id).length;
      return acc;
    }, {});
  },
  getCount(): number {
    return getCategories().length;
  },
};
