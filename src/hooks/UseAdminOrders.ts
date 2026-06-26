"use client";
import { useState, useCallback, useEffect } from "react";
import { adminOrderService } from "@/services/adminOrderService";
import { Order, OrderStatus } from "@/types/order";
export function useAdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {setOrders(adminOrderService.getAll());}, []);
  const updateOrderStatus = useCallback(
    (id: string, status: OrderStatus): boolean => {
      const updated = adminOrderService.updateStatus(id, status);
      if (updated) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? updated : o))
        );
        return true;
      }
      return false;
    },
    []
  );
  const deleteOrder = useCallback((id: string): boolean => {
    const success = adminOrderService.delete(id);
    if (success) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
    }
    return success;
  }, []);
  const refresh = useCallback(() => {
    setOrders(adminOrderService.getAll());
  }, []);
  return {
    orders,
    updateOrderStatus,
    deleteOrder,
    refresh,
    totalRevenue: adminOrderService.getTotalRevenue(),
    totalCount: orders.length,
    revenueByMonth: adminOrderService.getRevenueByMonth(),
    ordersByMonth: adminOrderService.getOrdersByMonth(),
    pendingOrders: orders.filter((o) => o.status === "pending"),
    processingOrders: orders.filter((o) => o.status === "processing"),
    deliveredOrders: orders.filter((o) => o.status === "delivered"),
    cancelledOrders: orders.filter((o) => o.status === "cancelled"),
  };
}
