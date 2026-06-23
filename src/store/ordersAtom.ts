import { atom } from "jotai";
import { orderStorage } from "@/lib/storage/order";
import { Order } from "@/types/order";
export const ordersAtom = atom<Order[]>(orderStorage.get());
export const ordersAtomWithSync = atom(
  (get) => get(ordersAtom),
  (_get, set, newOrders: Order[]) => {
    set(ordersAtom, newOrders);
    orderStorage.set(newOrders);
  }
);