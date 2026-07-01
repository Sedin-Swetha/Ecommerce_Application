import { atom } from "jotai";
import { AppNotification } from "@/types/notification";
import { notificationStorage } from "@/lib/storage/notifications";
export const notificationsAtom = atom<AppNotification[]>(
  typeof window !== "undefined" ? notificationStorage.get() : []
);