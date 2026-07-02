"use client";
import { useState } from "react";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/enums";
import { User } from "@/types/user";
type FilterType = "all" | "active" | "blocked" | "admin";
const AVATAR_COLORS = ["bg-blue-500","bg-teal-500","bg-violet-500","bg-orange-500","bg-pink-500","bg-indigo-500","bg-emerald-500"];
function avatarColor(seed: string) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
export default function UsersPage() {
    const { user: currentUser } = useAuth();
    const {
        users, blockUser, unblockUser, changeRole, deleteUser,
        totalUsers, activeUsers, blockedUsers, adminUsers,
    } = useAdminUsers();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<FilterType>("all");
    const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const isAdmin = currentUser?.role === UserRole.ADMIN;
    if (!isAdmin) {
        return (
            <div className="flex items-center justify-center py-32">
                <p className="text-gray-400">Access denied.</p>
            </div>
        );
    }
    const filtered = users.filter((u) => {
        const matchesSearch =
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            u.phone?.includes(search);
        const matchesFilter =
            filter === "all" ? true :
                filter === "active" ? !u.isBlocked :
                    filter === "blocked" ? u.isBlocked :
                        filter === "admin" ? u.role === UserRole.ADMIN : true;
        return matchesSearch && matchesFilter;
    });
    async function handleDelete() {
        if (!deleteTarget) return;
        setLoading(true);
        deleteUser(deleteTarget.id);
        setLoading(false);
        setDeleteTarget(null);
    }
    const stats = [
        {
            label: "Total Users", value: totalUsers,
            bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", iconBg: "bg-blue-100", iconColor: "text-blue-600",
            icon: (
                <>
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                </>
            ),
        },
        {
            label: "Active Users", value: activeUsers,
            bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", iconBg: "bg-emerald-100", iconColor: "text-emerald-600",
            icon: (
                <>
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <polyline points="17 11 19 13 23 9" />
                </>
            ),
        },
        {
            label: "Blocked Users", value: blockedUsers,
            bg: "bg-red-50", text: "text-red-700", border: "border-red-200", iconBg: "bg-red-100", iconColor: "text-red-600",
            icon: (
                <>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </>
            ),
        },
        {
            label: "Admins", value: adminUsers,
            bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", iconBg: "bg-violet-100", iconColor: "text-violet-600",
            icon: (
                <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
            ),
        },
    ];
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="mt-1 text-sm text-gray-500">Manage all registered users</p>
            </div>
            <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                {stats.map((s) => (
                    <div key={s.label} className={`flex items-center gap-3 rounded-2xl border ${s.border} ${s.bg} p-4`}>
                        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${s.iconBg}`}>
                            <svg className={s.iconColor} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                {s.icon}
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">{s.label}</p>
                            <p className={`mt-0.5 text-2xl font-bold ${s.text}`}>{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-sm">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, email or phone..."
                        className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {(["all", "active", "blocked", "admin"] as FilterType[]).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${filter === f
                                    ? "bg-primary text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-20 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <svg className="text-gray-400" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 00-3-3.87" />
                            <path d="M16 3.13a4 4 0 010 7.75" />
                        </svg>
                    </div>
                    <p className="mt-3 text-base font-semibold text-gray-700">No users found</p>
                    <p className="mt-1 text-sm text-gray-400">Try adjusting your search or filter.</p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50">
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">User</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 hidden md:table-cell">Phone</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 hidden sm:table-cell">Joined</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Role</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((u) => {
                                    const isSelf = u.id === currentUser?.id;
                                    const initials = u.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
                                    return (
                                        <tr key={u.id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    {u.profileImage ? (
                                                        <img src={u.profileImage} alt={u.name} className="h-9 w-9 rounded-full object-cover" />
                                                    ) : (
                                                        <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColor(u.id || u.email)}`}>
                                                            {initials}
                                                        </div>
                                                    )}
                                                    <div className="min-w-0">
                                                        <p className="font-semibold text-gray-900 truncate">
                                                            {u.name}
                                                            {isSelf && (
                                                                <span className="ml-1.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">You</span>
                                                            )}
                                                        </p>
                                                        <p className="text-xs text-gray-400 truncate">{u.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                                                {u.phone || <span className="text-gray-300">—</span>}
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">
                                                {new Date(u.createdAt).toLocaleDateString("en-IN", {
                                                    day: "numeric", month: "short", year: "numeric",
                                                })}
                                            </td>
                                            <td className="px-4 py-3">
                                                <select
                                                    value={u.role}
                                                    disabled={isSelf}
                                                    onChange={(e) => changeRole(u.id, e.target.value as UserRole)}
                                                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border-0 outline-none cursor-pointer ${u.role === UserRole.ADMIN
                                                            ? "bg-violet-100 text-violet-700"
                                                            : "bg-gray-100 text-gray-600"
                                                        } disabled:cursor-not-allowed disabled:opacity-60`}
                                                >
                                                    <option value={UserRole.USER}>User</option>
                                                    <option value={UserRole.ADMIN}>Admin</option>
                                                </select>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${u.isBlocked
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-emerald-100 text-emerald-700"
                                                    }`}>
                                                    {u.isBlocked ? "Blocked" : "Active"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    {!isSelf && (
                                                        u.isBlocked ? (
                                                            <button
                                                                onClick={() => unblockUser(u.id)}
                                                                className="flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-600 hover:bg-emerald-100 transition"
                                                            >
                                                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                                    <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" />
                                                                </svg>
                                                                Unblock
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => blockUser(u.id)}
                                                                className="flex items-center gap-1 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-xs font-semibold text-amber-600 hover:bg-amber-100 transition"
                                                            >
                                                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                                    <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                                                                </svg>
                                                                Block
                                                            </button>
                                                        )
                                                    )}
                                                    {!isSelf && (
                                                        <button
                                                            onClick={() => setDeleteTarget(u)}
                                                            className="flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                                                        >
                                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                                <polyline points="3 6 5 6 21 6" />
                                                                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                                                <path d="M10 11v6M14 11v6" />
                                                            </svg>
                                                            Delete
                                                        </button>
                                                    )}
                                                    {isSelf && (
                                                        <span className="text-xs text-gray-300 italic">No actions</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="text-lg font-bold text-gray-900">Delete User?</h2>
                        <p className="mt-2 text-sm text-gray-500">
                            <span className="font-semibold text-gray-800">"{deleteTarget.name}"</span> will be
                            permanently removed. This cannot be undone.
                        </p>
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
                            >
                                Cancel
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