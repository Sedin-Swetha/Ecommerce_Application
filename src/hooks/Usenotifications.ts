import { useAtom } from "jotai";
import { notificationsAtom } from "@/store/notificationsAtom";
import { notificationStorage } from "@/lib/storage/notifications";
import { AppNotification } from "@/types/notification";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/enums";
export function useNotifications() {
    const [all, setAll] = useAtom(notificationsAtom);
    const { user } = useAuth();
    const isAdmin = user?.role === UserRole.ADMIN;
    const notifications = all.filter((n) => {
        if (n.audience === "broadcast") return true;
        if (isAdmin) return n.audience === "admin";
        return n.audience === "user" && n.userId === user?.id;
    });
    const unreadCount = notifications.filter((n) => !n.read).length;
    function persist(updated: AppNotification[]) {
        setAll(updated);
        notificationStorage.set(updated);
    }
    function addNotification(notification: AppNotification): AppNotification {
        persist([notification, ...all]);
        return notification;
    }
    function markAsRead(id: string) {
        persist(all.map((n) => (n.id === id ? { ...n, read: true } : n)));
    }
    function markAllAsRead() {
        const visibleIds = new Set(notifications.map((n) => n.id));
        persist(all.map((n) => (visibleIds.has(n.id) ? { ...n, read: true } : n)));
    }
    function clearAll() {
        const visibleIds = new Set(notifications.map((n) => n.id));
        persist(all.filter((n) => !visibleIds.has(n.id)));
    }
    return { notifications, unreadCount, addNotification, markAsRead, markAllAsRead, clearAll };
}