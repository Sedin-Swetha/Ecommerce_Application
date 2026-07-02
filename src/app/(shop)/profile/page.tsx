"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/enums";
const AVATAR_COLORS = ["bg-blue-500","bg-teal-500","bg-violet-500","bg-orange-500","bg-pink-500","bg-indigo-500","bg-emerald-500"];
function avatarColor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
  });
  if (!user) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-gray-400">You need to be logged in to view this page.</p>
      </div>
    );
  }
  const initials = user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  function startEditing() {
    setForm({ name: user!.name, email: user!.email, phone: user!.phone ?? "" });
    setError(null);
    setSuccess(false);
    setIsEditing(true);
  }
  function cancelEditing() {
    setIsEditing(false);
    setError(null);
  }
  async function handleSave() {
    if (!form.name.trim()) {
      setError("Name can't be empty.");
      return;
    }
    if (!form.email.trim()) {
      setError("Email can't be empty.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      updateProfile({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      });
      setIsEditing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        {!isEditing && (
          <button
            onClick={startEditing}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
            Edit Profile
          </button>
        )}
      </div>
      {success && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/>
          </svg>
          Profile updated successfully.
        </div>
      )}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-xl font-bold text-white ${avatarColor(user.id || user.email)}`}>
            {initials}
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{user.name}</p>
            <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              user.role === UserRole.ADMIN
                ? "bg-violet-100 text-violet-700"
                : "bg-gray-100 text-gray-600"
            }`}>
              {user.role === UserRole.ADMIN ? "Admin" : "User"}
            </span>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-gray-900">Account Details</h2>
        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{error}</p>
        )}
        <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Full Name</p>
            {isEditing ? (
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            ) : (
              <p className="mt-1 text-sm text-gray-900">{user.name}</p>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Email Address</p>
            {isEditing ? (
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            ) : (
              <p className="mt-1 text-sm text-gray-900">{user.email}</p>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Phone Number</p>
            {isEditing ? (
              <input
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            ) : (
              <p className="mt-1 text-sm text-gray-900">{user.phone || <span className="text-gray-300">—</span>}</p>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Member Since</p>
            <p className="mt-1 text-sm font-medium text-primary">
              {new Date(user.createdAt).toLocaleDateString("en-IN", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Account Status</p>
            <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              user.isBlocked
                ? "bg-red-100 text-red-600"
                : "bg-emerald-100 text-emerald-700"
            }`}>
              {user.isBlocked ? "Blocked" : "Active"}
            </span>
          </div>
        </div>
        {isEditing && (
          <div className="mt-6 flex gap-3 border-t border-gray-100 pt-5">
            <button
              onClick={cancelEditing}
              disabled={loading}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-gray-900">Account ID</h2>
        <div className="mt-3 rounded-lg bg-gray-50 px-3 py-2.5 text-sm text-gray-500">
          {user.id}
        </div>
      </div>
    </div>
  );
}