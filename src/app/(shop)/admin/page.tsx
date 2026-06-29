"use client";
import Link from "next/link";
import { useAdminProducts } from "@/hooks/UseAdminProducts";
import { useAdminOrders } from "@/hooks/UseAdminOrders";
import { useAdminCategories } from "@/hooks/UseAdminCategories";
const STATUS_STYLES: Record<string, string> = {
  pending:    "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  shipped:    "bg-violet-100 text-violet-700",
  delivered:  "bg-emerald-100 text-emerald-700",
  cancelled:  "bg-red-100 text-red-600",
};
export default function AdminDashboardPage() {
  const { products, lowStockProducts }          = useAdminProducts();
  const { orders, totalRevenue, pendingOrders } = useAdminOrders();
  const { categories }                          = useAdminCategories();
  const stats = [
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: "💰",
      bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200",
      sub: "From delivered orders",
    },
    {
      label: "Total Orders",
      value: orders.length,
      icon: "📦",
      bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200",
      sub: `${pendingOrders.length} pending`,
    },
    {
      label: "Products",
      value: products.length,
      icon: "🛍️",
      bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200",
      sub: `${lowStockProducts.length} low stock`,
    },
    {
      label: "Categories",
      value: categories.length,
      icon: "🗂️",
      bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200",
      sub: "Active categories",
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here's what's happening in your store.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-2xl border ${s.border} ${s.bg} p-5`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">{s.label}</p>
                <p className={`mt-2 text-2xl font-bold ${s.text}`}>{s.value}</p>
                <p className="mt-1 text-xs text-gray-400">{s.sub}</p>
              </div>
              <span className="text-2xl">{s.icon}</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-gray-400">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { href: "/products", icon: "🛍️", label: "Manage Products",  desc: "Add, edit or delete products",    color: "bg-violet-600" },
            { href: "/orders",   icon: "📦", label: "Manage Orders",    desc: "View and update order statuses", color: "bg-emerald-600" },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition"
            >
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${a.color} text-xl`}>
                {a.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{a.label}</p>
                <p className="text-xs text-gray-400">{a.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {lowStockProducts.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-gray-400">
            ⚠️ Low Stock Alert
          </h2>
          <div className="overflow-hidden rounded-2xl border border-amber-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-amber-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Brand</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {lowStockProducts.slice(0, 5).map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                    <td className="px-4 py-3 text-gray-500">{p.brand}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        p.stock === 0 ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-700"
                      }`}>
                        {p.stock === 0 ? "Out of Stock" : `${p.stock} left`}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link href="/products" className="text-xs font-semibold text-primary hover:underline">
                        Update →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Recent Orders</h2>
          <Link href="/orders" className="text-xs font-semibold text-primary hover:underline">
            View all →
          </Link>
        </div>
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-12 text-center">
            <p className="text-sm text-gray-400">No orders yet</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 hidden sm:table-cell">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-700">{order.id}</td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      ₹{order.total.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                        STATUS_STYLES[order.status] ?? "bg-gray-100 text-gray-600"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}