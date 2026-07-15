import { CartItem } from "@/types/product";
const KEY = "cart";
export const cartStorage = {
    get: (): CartItem[] => {
        if (typeof window === "undefined") return [];
        try {
            const raw = localStorage.getItem(KEY);
            return raw ? (JSON.parse(raw) as CartItem[]) : [];
        } catch {
            return [];
        }
    },
    set: (items: CartItem[]): void => {
        if (typeof window === "undefined") return;
        localStorage.setItem(KEY, JSON.stringify(items));
    },
    clear: (): void => {
        if (typeof window === "undefined") return;
        localStorage.removeItem(KEY);
    },
};