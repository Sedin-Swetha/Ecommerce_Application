"use client";
import { useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useAdminProducts } from "@/hooks/UseAdminProducts";
import { useCart } from "@/hooks/useCart";
import { UserRole } from "@/types/enums";
import { AdminProductForm } from "@/types/admin";
import { Product } from "@/types/product";
import StarRating from "@/components/ui/StarRating";
import ProductFormModal from "@/components/products/ProductFormModal";
import ProductReviews from "@/components/products/ProductReviews";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
interface Props {
  product: Product;
}
export default function ProductDetailClient({ product: serverProduct }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const { products, updateProduct, deleteProduct } = useAdminProducts();
  const { addItem, increaseQuantity, decreaseQuantity, getQuantity } = useCart();
  const isAdmin = user?.role === UserRole.ADMIN;
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const product = products.find((p) => p.id === serverProduct.id) ?? serverProduct;
  if (!product) {
    notFound();
  }
  const discountedPrice = Math.round(product.price - (product.price * product.discount) / 100);
  const savedAmount = product.price - discountedPrice;
  const quantity = getQuantity(product.id);
  const initialData: Partial<AdminProductForm> = {
    name: product.name,
    description: product.description,
    categoryId: product.categoryId,
    brand: product.brand,
    price: product.price,
    discount: product.discount,
    stock: product.stock,
    images: product.images,
    isFeatured: product.isFeatured,
  };
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
    router.push("/products");
  }
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {isAdmin && (
        <div className="mb-6 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wide">
              Admin
            </span>
            <p className="text-sm font-medium text-blue-800">
              You are viewing this as an admin
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </button>
            <button
              onClick={() => setDeleteOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">{product.brand}</p>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
          <StarRating rating={product.rating} size={14} showValue />
          <div className="flex items-baseline gap-3">
            <p className="text-3xl font-bold text-gray-900">₹{discountedPrice.toLocaleString("en-IN")}</p>
            {product.discount > 0 && (
              <>
                <span className="text-base text-gray-400 line-through">₹{product.price.toLocaleString("en-IN")}</span>
                <span className="rounded-md bg-red-50 px-2 py-0.5 text-sm font-bold text-red-500">{product.discount}% OFF</span>
              </>
            )}
          </div>
          {product.discount > 0 && (
            <p className="text-sm font-medium text-green-600">You save ₹{savedAmount.toLocaleString("en-IN")}</p>
          )}
          <p className={`text-sm font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
            {product.stock > 0 ? `In Stock (${product.stock} left)` : "Out of Stock"}
          </p>
          <div className="mt-2">
            {isAdmin ? (
              <div className="rounded-xl border border-dashed border-gray-200 bg-blue-50 p-4 text-sm text-blue-700">
                Admins can manage inventory from the dashboard. Customer cart and wishlist actions are disabled for admin users.
              </div>
            ) : product.stock === 0 ? (
              <button disabled className="w-full cursor-not-allowed rounded-xl bg-gray-200 py-3 text-sm font-medium text-gray-500">Out of Stock</button>
            ) : quantity === 0 ? (
              <button onClick={() => addItem(product.id)} className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary-dark transition">Add to Cart</button>
            ) : (
              <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-1">
                <button onClick={() => decreaseQuantity(product.id)} className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-xl font-bold text-gray-700 shadow-sm hover:bg-gray-100">−</button>
                <span className="text-base font-bold text-gray-900">{quantity}</span>
                <button onClick={() => increaseQuantity(product.id)} className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-xl font-bold text-white hover:bg-primary-dark">+</button>
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
            <span className="text-xl">🚚</span>
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Free Delivery</span>
              <span className="text-sm font-medium text-emerald-800">
                Expected by <span className="font-bold">{new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { weekday: 'short', month: 'short', day: 'numeric' })}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ProductFormModal open={editOpen} onClose={() => setEditOpen(false)} onSubmit={handleUpdate} initialData={initialData} mode="edit" loading={loading} />
      <ConfirmDialog open={deleteOpen} title="Delete Product?" message={`"${product.name}" will be permanently deleted and you'll be redirected to the products page.`} confirmLabel="Yes, Delete" cancelLabel="Keep It" variant="danger" loading={loading} onConfirm={handleDelete} onCancel={() => setDeleteOpen(false)} />
      <ProductReviews productId={product.id} />
    </div>
  );
}
