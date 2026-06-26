"use client";
import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { AdminProductForm } from "@/types/admin";
import { CategoryId } from "@/types/product";
import { defaultCategories } from "@/data/categories";
interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (form: AdminProductForm) => void;
  initialData?: Partial<AdminProductForm>; 
  mode: "add" | "edit";
  loading?: boolean;
}
const EMPTY_FORM: AdminProductForm = {
  name: "",
  description: "",
  categoryId: "CAT001",
  brand: "",
  price: 0,
  discount: 0,
  stock: 0,
  images: [""],
  isFeatured: false,
};
export default function ProductFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
  mode,
  loading = false,
}: Props) {
  const [form, setForm] = useState<AdminProductForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof AdminProductForm, string>>>({});
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({ ...EMPTY_FORM, ...initialData });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [open, mode, initialData]);
  function validate(): boolean {
    const e: typeof errors = {};
    if (!form.name.trim())        e.name        = "Name is required";
    if (!form.brand.trim())       e.brand       = "Brand is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (form.price <= 0)          e.price       = "Price must be greater than 0";
    if (form.stock < 0)           e.stock       = "Stock cannot be negative";
    if (form.discount < 0 || form.discount > 100) e.discount = "Discount must be 0–100";
    if (!form.images[0]?.trim())  e.images      = "At least one image URL is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  }
  const field = (label: string, key: keyof AdminProductForm, type = "text", placeholder = "") => (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key] as string | number}
        onChange={(e) =>
          setForm({ ...form, [key]: type === "number" ? Number(e.target.value) : e.target.value })
        }
        className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 ${
          errors[key] ? "border-red-400 bg-red-50" : "border-gray-200"
        }`}
      />
      {errors[key] && <p className="text-xs text-red-500">{errors[key]}</p>}
    </div>
  );
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "add" ? "Add New Product" : "Edit Product"}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {field("Product Name", "name", "text", "e.g. iPhone 15 Pro")}
          {field("Brand", "brand", "text", "e.g. Apple")}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Short product description..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none ${
              errors.description ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Category
          </label>
          <select
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value as CategoryId })}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {defaultCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {field("Price (₹)", "price", "number", "0")}
          {field("Discount (%)", "discount", "number", "0")}
          {field("Stock", "stock", "number", "0")}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Image URL
          </label>
          <input
            type="text"
            placeholder="https://images.unsplash.com/..."
            value={form.images[0] ?? ""}
            onChange={(e) => setForm({ ...form, images: [e.target.value] })}
            className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 ${
              errors.images ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.images && <p className="text-xs text-red-500">{errors.images}</p>}
          {form.images[0] && (
            <img
              src={form.images[0]}
              alt="preview"
              className="mt-2 h-24 w-24 rounded-lg object-cover border border-gray-200"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          )}
        </div>
        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-gray-800">Featured Product</p>
            <p className="text-xs text-gray-500">Show this product in featured sections</p>
          </div>
          <div
            onClick={() => setForm({ ...form, isFeatured: !form.isFeatured })}
            className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
              form.isFeatured ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
              form.isFeatured ? "translate-x-5" : "translate-x-0.5"
            }`} />
          </div>
        </label>
        <div className="flex flex-col-reverse gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Saving…
              </>
            ) : mode === "add" ? (
              "Add Product"
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
