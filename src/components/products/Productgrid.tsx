"use client";
import { useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { AdminProductForm } from "@/types/admin";
import { useAdminProducts } from "@/hooks/UseAdminProducts";
import ProductCard from "./Productcard";
import ProductFormModal from "./ProductFormModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
interface Props {
  products: Product[];
  isAdmin?: boolean;
}
export default function ProductGrid({ products, isAdmin = false }: Props) {
  const { updateProduct, deleteProduct } = useAdminProducts();
  const [editProduct, setEditProduct]     = useState<Product | null>(null);
  const [deleteProduct_, setDeleteProduct] = useState<Product | null>(null);
  const [loading, setLoading]             = useState(false);
  async function handleUpdate(form: AdminProductForm) {
    if (!editProduct) return;
    setLoading(true);
    updateProduct(editProduct.id, form);
    setLoading(false);
    setEditProduct(null);
  }
  async function handleDelete() {
    if (!deleteProduct_) return;
    setLoading(true);
    deleteProduct(deleteProduct_.id);
    setLoading(false);
    setDeleteProduct(null);
  }
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-20 text-center">
        <span className="text-4xl">🔍</span>
        <p className="mt-3 text-base font-semibold text-gray-700">No products found</p>
        <p className="mt-1 text-sm text-gray-400">Try adjusting your filters or search term.</p>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 xl:grid-cols-4">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="h-full">
            <ProductCard
              product={product}
              isAdmin={isAdmin}
              onEdit={() => setEditProduct(product)}
              onDelete={() => setDeleteProduct(product)}
            />
          </Link>
        ))}
      </div>

      {/* Single shared modal — only one ever mounts */}
      <ProductFormModal
        open={!!editProduct}
        onClose={() => setEditProduct(null)}
        onSubmit={handleUpdate}
        initialData={editProduct ?? undefined}
        mode="edit"
        loading={loading}
      />
      <ConfirmDialog
        open={!!deleteProduct_}
        title="Delete Product?"
        message={`"${deleteProduct_?.name}" will be permanently deleted. This cannot be undone.`}
        confirmLabel="Yes, Delete"
        cancelLabel="Keep It"
        variant="danger"
        loading={loading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteProduct(null)}
      />
    </>
  );
}