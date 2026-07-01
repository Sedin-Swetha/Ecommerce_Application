export enum NotificationType {
  ORDER_PLACED = "order_placed",
  ORDER_STATUS_CHANGED = "order_status_changed",
  LOW_STOCK = "low_stock",
  NEW_ORDER = "new_order",
  SALE = "sale",
}
export type NotificationAudience = "user" | "admin" | "broadcast";
export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
  audience: NotificationAudience;
  userId?: string; 
}