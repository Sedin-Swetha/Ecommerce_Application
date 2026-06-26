import { Order, OrderStatus } from "@/types/order";
import { STORAGE_KEYS } from "@/constants/StorageKeys";
export const orderStorage = {
  get: (): Order[] => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return raw ? (JSON.parse(raw) as Order[]) : [];
    } catch {
      return [];
    }
  },
  set: (orders: Order[]): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  },
  clear: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
  },
};
export function getOrders(): Order[] {
  return orderStorage.get();
}
export function saveOrders(orders: Order[]): void {
  orderStorage.set(orders);
}
export function getOrderById(id: string): Order | null {
  return orderStorage.get().find((o) => o.id === id) ?? null;
}
export function getOrdersByUser(userId: string): Order[] {
  return orderStorage.get().filter((o) => o.userId === userId);
}
export function addOrder(
  order: Omit<Order, "id" | "createdAt" | "updatedAt">
): Order {
  const orders = orderStorage.get();
  const newOrder: Order = {
    ...order,
    id: `ORD${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  orderStorage.set([newOrder, ...orders]); 
  return newOrder;
}
export function updateOrderStatus(
  id: string,
  status: OrderStatus
): Order | null {
  const orders = orderStorage.get();
  let updated: Order | null = null;
  const next = orders.map((o) => {
    if (o.id !== id) return o;
    updated = { ...o, status, updatedAt: new Date().toISOString() };
    return updated;
  });
  if (updated) orderStorage.set(next);
  return updated;
}
export function deleteOrder(id: string): boolean {
  const orders = orderStorage.get();
  const next = orders.filter((o) => o.id !== id);
  if (next.length === orders.length) return false;
  orderStorage.set(next);
  return true;
}