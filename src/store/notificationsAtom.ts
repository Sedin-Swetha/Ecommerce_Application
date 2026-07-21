import { atom } from "jotai";
import { AppNotification } from "@/types/notification";
export const notificationsAtom = atom<AppNotification[]>([]);