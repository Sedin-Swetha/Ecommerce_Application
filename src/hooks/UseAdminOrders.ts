"use client";
import { useState, useCallback, useEffect } from "react";
import { adminOrderService } from "@/services/adminOrderService";
import { Order, OrderStatus } from "@/types/order";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/enums";
import { useAtomValue } from "jotai";
import { productsAtom } from "@/store/ProductAtom";
export function useAdminOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    useEffect(() => { setOrders(adminOrderService.getAll()); }, []);
    const updateOrderStatus = useCallback(
        (id: string, status: OrderStatus): Order | null => {
            const updated = adminOrderService.updateStatus(id, status);
            if (updated) {
                setOrders((prev) =>
                    prev.map((o) => (o.id === id ? updated : o))
                );
                return updated;
            }
            return null;
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

    const { user } = useAuth();
    const globalProducts = useAtomValue(productsAtom);

    let finalOrders = orders;
    let finalRevenue = adminOrderService.getTotalRevenue();

    if (user?.role === UserRole.VENDOR) {
        const vendorProductIds = new Set(globalProducts.filter(p => p.vendorId === user.id).map(p => p.id));
        
        // Only include orders that have at least one vendor item
        const vendorOrders = orders.filter(o => o.items.some(item => vendorProductIds.has(item.productId)));
        
        // Deeply map orders so the vendor ONLY sees their items and their specific totals
        finalOrders = vendorOrders.map(order => {
            const vendorItems = order.items.filter(item => vendorProductIds.has(item.productId));
            const vendorSubtotal = vendorItems.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0);
            
            return {
                ...order,
                items: vendorItems,
                subtotal: vendorSubtotal,
                // Adjust shipping or leave as is. For simplicity, we just set total to the vendor's subtotal 
                // (or you could divide shipping charge if needed, but this prevents leaking the full cart value).
                total: vendorSubtotal,
            };
        });
        
        finalRevenue = finalOrders
            .filter(o => o.status === "delivered")
            .reduce((sum, order) => sum + order.total, 0);
    } else {
        finalRevenue = finalOrders
            .filter(o => o.status === "delivered")
            .reduce((sum, order) => sum + order.total, 0);
    }

    const months = 6;
    const revenueByMonth: { month: string; revenue: number }[] = [];
    const ordersByMonth: { month: string; orders: number }[] = [];
    
    for (let i = months - 1; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const month = date.toLocaleString("default", { month: "short" });
        const year = date.getFullYear();
        
        const monthOrders = finalOrders.filter((o) => {
            const d = new Date(o.createdAt);
            return d.getMonth() === date.getMonth() && d.getFullYear() === year;
        });
        
        const count = monthOrders.length;
        const revenue = monthOrders
            .filter(o => o.status === "delivered")
            .reduce((sum, o) => sum + o.total, 0);
            
        revenueByMonth.push({ month, revenue });
        ordersByMonth.push({ month, orders: count });
    }

    return {
        orders: finalOrders, updateOrderStatus, deleteOrder, refresh,
        totalRevenue: finalRevenue,
        totalCount: finalOrders.length,
        revenueByMonth,
        ordersByMonth,
        pendingOrders: finalOrders.filter((o) => o.status === "pending"),
        processingOrders: finalOrders.filter((o) => o.status === "processing"),
        deliveredOrders: finalOrders.filter((o) => o.status === "delivered"),
        cancelledOrders: finalOrders.filter((o) => o.status === "cancelled"),
    };
}