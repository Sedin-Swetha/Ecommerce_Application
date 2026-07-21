"use client";
import { useState } from "react";
import { useAdminCategories } from "@/hooks/UseAdminCategories";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/enums";
import { AdminCategoryForm } from "@/types/admin";
interface ModalProps {
  title: string;
  form: AdminCategoryForm;
  error: string;
  loading: boolean;
  onChange: (form: AdminCategoryForm) => void;
  onSubmit: () => void;
  onClose: () => void;
}
function CategoryModal({ title, form, error, loading, onChange, onSubmit, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              value={form.name}
              onChange={(e) => onChange({ ...form, name: e.target.value })}
              placeholder="e.g. Electronics"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => onChange({ ...form, description: e.target.value })}
              placeholder="Short description..."
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
              Image URL
            </label>
            <input
              value={form.image}
              onChange={(e) => onChange({ ...form, image: e.target.value })}
              placeholder="https://..."
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          {error && <p className="text-xs font-medium text-red-500">{error}</p>}
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={loading}
            className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition disabled:opacity-60">
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default function CategoriesPage() {
  const { user } = useAuth();
  const { categories, addCategory, updateCategory, deleteCategory, productCounts } =useAdminCategories();
  const isAdmin = user?.role === UserRole.ADMIN;
  const emptyForm: AdminCategoryForm = { name: "", description: "", image: "" };
  const [addOpen, setAddOpen]           = useState(false);
  const [editTarget, setEditTarget]     = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [form, setForm]                 = useState<AdminCategoryForm>(emptyForm);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [deleteError, setDeleteError]   = useState("");
  function openAdd() {
    setForm(emptyForm);
    setError("");
    setAddOpen(true);
  }
  function openEdit(id: string) {
    const cat = categories.find((c) => c.id === id);
    if (!cat) return;
    setForm({ name: cat.name, description: cat.description ?? "", image: cat.image ?? "" });
    setError("");
    setEditTarget(id);
  }
  async function handleAdd() {
    if (!form.name.trim()) { setError("Name is required."); return; }
    setLoading(true);
    addCategory(form);
    setLoading(false);
    setAddOpen(false);
  }
  async function handleEdit() {
    if (!editTarget) return;
    if (!form.name.trim()) { setError("Name is required."); return; }
    setLoading(true);
    updateCategory(editTarget, form);
    setLoading(false);
    setEditTarget(null);
  }
  async function handleDelete() {
    if (!deleteTarget) return;
    setLoading(true);
    const result = deleteCategory(deleteTarget);
    setLoading(false);
    if (!result.success) {
      setDeleteError(result.message);
      return;
    }
    setDeleteTarget(null);
    setDeleteError("");
  }
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-gray-400">Access denied.</p>
      </div>
    );
  }
  const deleteTarget_ = categories.find((c) => c.id === deleteTarget);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="mt-1 text-sm text-gray-500">{categories.length} categories total</p>
        </div>
        <button
          onClick={openAdd}
          className="hidden sm:flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Category
        </button>
      </div>
      <button
        onClick={openAdd}
        className="fixed bottom-6 right-6 z-40 flex sm:hidden h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark transition"
        aria-label="Add Category"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-20 text-center">
          <span className="text-4xl">🗂️</span>
          <p className="mt-3 text-base font-semibold text-gray-700">No categories yet</p>
          <p className="mt-1 text-sm text-gray-400">Add your first category to get started.</p>
          <button
            onClick={openAdd}
            className="mt-4 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition"
          >
            Add Category
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 hidden md:table-cell">Description</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Products</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="h-9 w-9 rounded-lg object-cover border border-gray-100"
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-lg">
                          🗂️
                        </div>
                      )}
                      <span className="font-semibold text-gray-900">{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                    {cat.description || <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700">
                      {productCounts[cat.id] ?? 0}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(cat.id)}
                        className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100 transition"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => { setDeleteTarget(cat.id); setDeleteError(""); }}
                        className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                          <path d="M10 11v6M14 11v6"/>
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {addOpen && (
        <CategoryModal
          title="Add Category"
          form={form}
          error={error}
          loading={loading}
          onChange={setForm}
          onSubmit={handleAdd}
          onClose={() => setAddOpen(false)}
        />
      )}
      {editTarget && (
        <CategoryModal
          title="Edit Category"
          form={form}
          error={error}
          loading={loading}
          onChange={setForm}
          onSubmit={handleEdit}
          onClose={() => setEditTarget(null)}
        />
      )}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900">Delete Category?</h2>
            <p className="mt-2 text-sm text-gray-500">
              <span className="font-semibold text-gray-800">"{deleteTarget_?.name}"</span> will be
              permanently deleted.
            </p>
            {(productCounts[deleteTarget] ?? 0) > 0 && (
              <p className="mt-1 text-sm font-medium text-amber-600">
                ⚠️ {productCounts[deleteTarget]} product(s) are still assigned to this category.
              </p>
            )}
            {deleteError && (
              <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
                {deleteError}
              </p>
            )}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => { setDeleteTarget(null); setDeleteError(""); }}
                className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
              >
                Keep It
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition disabled:opacity-60"
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}