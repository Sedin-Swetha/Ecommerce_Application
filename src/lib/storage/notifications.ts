import { AppNotification } from "@/types/notification";
import { STORAGE_KEYS } from "@/constants/StorageKeys";
const KEY = STORAGE_KEYS.NOTIFICATIONS;
export const notificationStorage = {
    get: (): AppNotification[] => {
        if (typeof window === "undefined") return [];
        try {
            const raw = localStorage.getItem(KEY);
            return raw ? (JSON.parse(raw) as AppNotification[]) : [];
        } catch {
            return [];
        }
    },
    set: (items: AppNotification[]): void => {
        if (typeof window === "undefined") return;
        localStorage.setItem(KEY, JSON.stringify(items));
    },
    clear: (): void => {
        if (typeof window === "undefined") return;
        localStorage.removeItem(KEY);
    },
};