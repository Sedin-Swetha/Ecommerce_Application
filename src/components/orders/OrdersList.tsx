"use client";
import Link from "next/link";
import Image from "next/image";
import { useOrders } from "@/hooks/UseOrders";
import { Order } from "@/types/order";
const STATUS_STYLES: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-primary/10 text-primary-dark",
    shipped: "bg-primary/10 text-primary-dark",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
};
const STATUS_ICONS: Record<string, string> = {
    pending: "🕐",
    processing: "⚙️",
    shipped: "🚚",
    delivered: "✅",
    cancelled: "❌",
};
interface Props { userId: string; }
export default function OrdersList({ userId }: Props) {
    const { getUserOrders } = useOrders();
    const allOrders = getUserOrders(userId);
    const orders: Order[] = Array.from(
        new Map(allOrders.map((o) => [o.id, o])).values()
    );
    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-gray-200 bg-white py-16 text-center shadow-sm">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
                    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                    <rect x="9" y="3" width="6" height="4" rx="1" />
                </svg>
                <p className="text-lg font-semibold text-gray-800">No orders yet</p>
                <p className="text-sm text-gray-500">Start shopping to see your orders here.</p>
                <Link
                    href="/products"
                    className="mt-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition"
                >
                    Browse Products
                </Link>
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-3">
            {orders.map((order, index) => (
                <div key={`${order.id}-${index}`} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-bold text-gray-900">{order.id}</span>
                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${STATUS_STYLES[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                                    {STATUS_ICONS[order.status]} {order.status}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">
                                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                    day: "numeric", month: "short", year: "numeric",
                                })}
                                {" · "}
                                {order.items.length} {order.items.length === 1 ? "item" : "items"}
                                {" · "}
                                <span className="capitalize">{order.paymentMethod.toUpperCase()}</span>
                            </p>
                        </div>
                        <div className="text-right shrink-0">
                            <p className="text-base font-bold text-gray-900">
                                ₹{order.total.toLocaleString("en-IN")}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 mb-3">
                        {order.items.slice(0, 4).map((item, itemIndex) => (
                            <div
                                key={`${item.productId}-${itemIndex}`}
                                className="relative h-12 w-12 overflow-hidden rounded-lg bg-gray-50 border border-gray-100 shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                />
                            </div>
                        ))}
                        {order.items.length > 4 && (
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-xs font-semibold text-gray-500 shrink-0">
                                +{order.items.length - 4}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                        <Link
                            href={`/orders/${order.id}`}
                            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                        >
                            View Details
                        </Link>
                        {order.status === "pending" && (
                            <span className="text-xs text-gray-400">
                                You can cancel this order from details page
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}