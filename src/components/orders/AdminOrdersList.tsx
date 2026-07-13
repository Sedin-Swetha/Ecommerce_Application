"use client";
import { useAdminOrders } from "@/hooks/UseAdminOrders";
import { OrderStatus } from "@/types/order";
import { useNotifications } from "@/hooks/Usenotifications";
import { createOrderStatusNotification } from "@/services/Notificationservice";
const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered", "cancelled"] as const;
const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-violet-100 text-violet-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-600",
};
export default function AdminOrdersList() {
  const { orders, updateOrderStatus } = useAdminOrders();
  const { addNotification } = useNotifications();
  function handleStatusChange(orderId: string, newStatus: OrderStatus) {
    const updated = updateOrderStatus(orderId, newStatus);
    if (updated) {
      addNotification(
        createOrderStatusNotification(updated.id, updated.userId, updated.status)
      );
    }
  }
  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 py-16 text-center">
        <p className="text-sm text-gray-400 dark:text-gray-500">No orders yet</p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Order ID</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 hidden sm:table-cell">Customer</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 hidden md:table-cell">Date</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Total</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <td className="px-4 py-3 font-mono text-xs text-gray-700 dark:text-gray-300">{order.id}</td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400 hidden sm:table-cell">{order.userId}</td>
              <td className="px-4 py-3 text-gray-500 dark:text-gray-400 hidden md:table-cell">
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric",
                })}
              </td>
              <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">
                ₹{order.total.toLocaleString("en-IN")}
              </td>
              <td className="px-4 py-3">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize cursor-pointer border-0 outline-none ${
                    STATUS_STYLES[order.status] ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}