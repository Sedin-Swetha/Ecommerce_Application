import { OrderStatus } from "./order";
import {CategoryId} from "./product";
export interface AdminProductForm {
  name: string;
  description: string;
  categoryId: CategoryId;
  brand: string;
  price: number;
  discount: number;
  stock: number;
  images: string[];   
  isFeatured: boolean;
}
export interface AdminCategoryForm {
  name: string;
  image: string;
  description?: string;
}
export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  revenueGrowth: number;  
  ordersGrowth: number;   
}
export interface RevenueByMonth {
  month: string;          
  revenue: number;
}
export interface OrdersByMonth {
  month: string;
  orders: number;
}
export interface CategoryRevenue {
  category: string;
  value: number;
}
export type NotificationType = "order" | "stock" | "user";
export interface AdminNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;      
  linkTo?: string;         
}
export interface OrderStatusUpdate {
  orderId: string;
  status: OrderStatus;
  updatedAt: string;
}
