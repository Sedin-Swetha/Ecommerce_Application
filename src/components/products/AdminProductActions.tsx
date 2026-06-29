"use client";
import { useState } from "react";
import { Product } from "@/types/product";
import { AdminProductForm } from "@/types/admin";
import { useAdminProducts } from "@/hooks/UseAdminProducts";
import ProductFormModal from "./ProductFormModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
interface Props {
  product: Product;
}
export default function AdminProductActions({ product }: Props) {
  const { updateProduct, deleteProduct } = useAdminProducts();
  const [editOpen, setEditOpen]       = useState(false);
  const [deleteOpen, setDeleteOpen]   = useState(false);
  const [loading, setLoading]         = useState(false);
  async function handleUpdate(form: AdminProductForm) {
    setLoading(true);
    updateProduct(product.id, form);
    setLoading(false);
    setEditOpen(false);
  }
  async function handleDelete() {
    setLoading(true);
    deleteProduct(product.id);
    setLoading(false);
    setDeleteOpen(false);
  }
  const initialData: Partial<AdminProductForm> = {
    name:        product.name,
    description: product.description,
    categoryId:  product.categoryId,
    brand:       product.brand,
    price:       product.price,
    discount:    product.discount,
    stock:       product.stock,
    images:      product.images,
    isFeatured:  product.isFeatured,
  };
  return (
    <>
      <div className="flex gap-2 border-t border-gray-100 px-3 py-2">
        <button
          onClick={(e) => { e.preventDefault(); setEditOpen(true); }}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100 transition"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Edit
        </button>
        <button
          onClick={(e) => { e.preventDefault(); setDeleteOpen(true); }}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
          </svg>
          Delete
        </button>
      </div>
      <ProductFormModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleUpdate}
        initialData={initialData}
        mode="edit"
        loading={loading}
      />
      <ConfirmDialog
        open={deleteOpen}
        title="Delete Product?"
        message={`"${product.name}" will be permanently deleted. This cannot be undone.`}
        confirmLabel="Yes, Delete"
        cancelLabel="Keep It"
        variant="danger"
        loading={loading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </>
  );
}
