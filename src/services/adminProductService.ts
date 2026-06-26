import {getProducts,saveProducts,addProduct as storageAdd,updateProduct as storageUpdate,deleteProduct as storageDelete} from "@/lib/storage/products";
import { Product } from "@/types/product";
import { AdminProductForm } from "@/types/admin";
export const adminProductService = {
  getAll(): Product[] {
    return getProducts();
  },
  getById(id: string): Product | null {
    return getProducts().find((p) => p.id === id) ?? null;
  },
  add(form: AdminProductForm): Product {
    return storageAdd({
      ...form,
      rating: 0,   
    });
  },
  update(id: string, form: Partial<AdminProductForm>): Product | null {
    return storageUpdate(id, form);
  },
  delete(id: string): boolean {
    return storageDelete(id);
  },
  toggleFeatured(id: string): Product | null {
    const product = this.getById(id);
    if (!product) return null;
    return storageUpdate(id, { isFeatured: !product.isFeatured });
  },
  updateStock(id: string, stock: number): Product | null {
    return storageUpdate(id, { stock });
  },
  getLowStock(threshold = 10): Product[] {
    return getProducts().filter((p) => p.stock <= threshold);
  },
  getCount(): number {
    return getProducts().length;
  },
};
