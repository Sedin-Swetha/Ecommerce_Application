"use client";
import { useAtom } from "jotai";
import { ordersAtomWithSync } from "@/store/ordersAtom";
import { useAdminProducts } from "@/hooks/UseAdminProducts";
import { Order, OrderStatus, ShippingAddress, PaymentMethod, OrderItem } from "@/types/order";
export function useOrders() {
    const [orders, setOrders] = useAtom(ordersAtomWithSync);
    const { adjustStock } = useAdminProducts();
    function adjustStockForItems(items: OrderItem[], direction: 1 | -1) {
        items.forEach((item) => {
            adjustStock(item.productId, direction * item.quantity);
        });
    }
    const placeOrder = (params: {
        userId: string;
        items: OrderItem[];
        shippingAddress: ShippingAddress;
        paymentMethod: PaymentMethod;
        subtotal: number;
        shippingCharge: number;
        total: number;
    }): Order => {
        const createdAt = new Date();
        const expectedDeliveryDate = new Date(createdAt);
        expectedDeliveryDate.setDate(createdAt.getDate() + 5);
        const order: Order = {
            id: `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            status: "pending",
            createdAt: createdAt.toISOString(),
            updatedAt: createdAt.toISOString(),
            expectedDeliveryDate: expectedDeliveryDate.toISOString(),
            ...params,
        };
        const exists = orders.some((o) => o.id === order.id);
        if (!exists) {
            setOrders([order, ...orders]);
            adjustStockForItems(order.items, -1);
        }
        return order;
    };
    const getUserOrders = (userId: string): Order[] => {
        const filtered = orders.filter((o) => o.userId === userId);
        return Array.from(new Map(filtered.map((o) => [o.id, o])).values());
    };
    const getOrderById = (orderId: string): Order | null =>
        orders.find((o) => o.id === orderId) ?? null;
    const updateStatus = (orderId: string, status: OrderStatus) => {
        const target = orders.find((o) => o.id === orderId);
        if (!target) return;
        if (status === "cancelled" && target.status !== "cancelled") {
            adjustStockForItems(target.items, 1);
        }
        setOrders(orders.map((o) =>
            o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o
        ));
    };
    const cancelOrder = (orderId: string) => updateStatus(orderId, "cancelled");
    return { orders, placeOrder, getUserOrders, getOrderById, updateStatus, cancelOrder };
}