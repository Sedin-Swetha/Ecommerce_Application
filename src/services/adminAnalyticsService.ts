import { getOrders } from "@/lib/storage/orders";
import { getProducts } from "@/lib/storage/products";
import { getCategories } from "@/lib/storage/categories";
import { AdminStats, RevenueByMonth, OrdersByMonth, CategoryRevenue } from "@/types/admin";
export const adminAnalyticsService = {
    getSummary(): AdminStats {
        const orders = getOrders();
        const products = getProducts();
        const deliveredOrders = orders.filter((o) => o.status === "delivered");
        const totalRevenue = deliveredOrders.reduce((sum, o) => sum + o.total, 0);
        const now = new Date();
        const thisMonth = deliveredOrders.filter((o) => {
            const d = new Date(o.createdAt);
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        }).reduce((sum, o) => sum + o.total, 0);
        const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonth = deliveredOrders.filter((o) => {
            const d = new Date(o.createdAt);
            return d.getMonth() === lastMonthDate.getMonth() && d.getFullYear() === lastMonthDate.getFullYear();
        }).reduce((sum, o) => sum + o.total, 0);
        const revenueGrowth = lastMonth === 0
            ? 100
            : Math.round(((thisMonth - lastMonth) / lastMonth) * 100);
        const thisMonthOrders = orders.filter((o) => {
            const d = new Date(o.createdAt);
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        }).length;
        const lastMonthOrders = orders.filter((o) => {
            const d = new Date(o.createdAt);
            return d.getMonth() === lastMonthDate.getMonth() && d.getFullYear() === lastMonthDate.getFullYear();
        }).length;
        const ordersGrowth = lastMonthOrders === 0
            ? 100
            : Math.round(((thisMonthOrders - lastMonthOrders) / lastMonthOrders) * 100);
        return {
            totalRevenue,
            totalOrders: orders.length,
            totalProducts: products.length,
            totalUsers: 0,
            revenueGrowth,
            ordersGrowth,
        };
    },
    getRevenueByMonth(months = 6): RevenueByMonth[] {
        const orders = getOrders().filter((o) => o.status === "delivered");
        const result: RevenueByMonth[] = [];
        for (let i = months - 1; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const month = date.toLocaleString("default", { month: "short" });
            const year = date.getFullYear();
            const revenue = orders
                .filter((o) => {
                    const d = new Date(o.createdAt);
                    return d.getMonth() === date.getMonth() && d.getFullYear() === year;
                })
                .reduce((sum, o) => sum + o.total, 0);

            result.push({ month, revenue });
        }
        return result;
    },
    getOrdersByMonth(months = 6): OrdersByMonth[] {
        const orders = getOrders();
        const result: OrdersByMonth[] = [];
        for (let i = months - 1; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const month = date.toLocaleString("default", { month: "short" });
            const year = date.getFullYear();
            const count = orders.filter((o) => {
                const d = new Date(o.createdAt);
                return d.getMonth() === date.getMonth() && d.getFullYear() === year;
            }).length;
            result.push({ month, orders: count });
        }
        return result;
    },
    getRevenueByCategory(): CategoryRevenue[] {
        const orders = getOrders().filter((o) => o.status === "delivered");
        const products = getProducts();
        const categories = getCategories();
        const productCategoryMap = new Map(products.map((p) => [p.id, p.categoryId]));
        const categoryNameMap = new Map(categories.map((c) => [c.id, c.name]));
        const revenueMap = new Map<string, number>();
        orders.forEach((order) => {
            order.items.forEach((item) => {
                const categoryId = productCategoryMap.get(item.productId);
                if (!categoryId) return;
                const name = categoryNameMap.get(categoryId) ?? categoryId;
                const current = revenueMap.get(name) ?? 0;
                revenueMap.set(name, current + item.discountedPrice * item.quantity);
            });
        });
        return Array.from(revenueMap.entries())
            .map(([category, value]) => ({ category, value }))
            .sort((a, b) => b.value - a.value);
    },
    getTopProducts(limit = 5): { name: string; brand: string; sold: number; revenue: number }[] {
        const orders = getOrders().filter((o) => o.status === "delivered");
        const products = getProducts();
        const map = new Map<string, { sold: number; revenue: number }>();
        orders.forEach((order) => {
            order.items.forEach((item) => {
                const current = map.get(item.productId) ?? { sold: 0, revenue: 0 };
                map.set(item.productId, {
                    sold: current.sold + item.quantity,
                    revenue: current.revenue + item.discountedPrice * item.quantity,
                });
            });
        });
        return Array.from(map.entries())
            .map(([productId, stats]) => {
                const product = products.find((p) => p.id === productId);
                return {
                    name: product?.name ?? productId,
                    brand: product?.brand ?? "",
                    sold: stats.sold,
                    revenue: stats.revenue,
                };
            })
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, limit);
    },
    getOrderStatusBreakdown(): { status: string; count: number }[] {
        const orders = getOrders();
        const map = new Map<string, number>();
        orders.forEach((o) => {
            map.set(o.status, (map.get(o.status) ?? 0) + 1);
        });
        return Array.from(map.entries()).map(([status, count]) => ({ status, count }));
    },
};
