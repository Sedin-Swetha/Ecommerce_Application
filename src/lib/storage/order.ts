import { Order } from "@/types/order";
const KEY = "orders";
export const orderStorage = {
  get: (): Order[] => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as Order[]) : [];
    } catch {
      return [];
    }
  },
  set: (orders: Order[]): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(orders));
  },
  clear: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(KEY);
  },
};