import { useAtom } from "jotai";
import { ordersAtomWithSync } from "@/store/ordersAtom";
import { Order, OrderStatus, ShippingAddress, PaymentMethod, OrderItem } from "@/types/order";
export function useOrders() {
  const [orders, setOrders] = useAtom(ordersAtomWithSync);
  const placeOrder = (params: {
    userId: string;
    items: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: PaymentMethod;
    subtotal: number;
    shippingCharge: number;
    total: number;
  }): Order => {
    const order: Order = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...params,
    };
    const exists = orders.some((o) => o.id === order.id);
    if (!exists) setOrders([order, ...orders]);
    return order;
  };

  const getUserOrders = (userId: string): Order[] => {
    const filtered = orders.filter((o) => o.userId === userId);
    return Array.from(new Map(filtered.map((o) => [o.id, o])).values());
  };

  const getOrderById = (orderId: string): Order | null =>
    orders.find((o) => o.id === orderId) ?? null;

  const updateStatus = (orderId: string, status: OrderStatus) => {
    setOrders(orders.map((o) =>
      o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o
    ));
  };

  const cancelOrder = (orderId: string) => updateStatus(orderId, "cancelled");

  return { orders, placeOrder, getUserOrders, getOrderById, updateStatus, cancelOrder };
}