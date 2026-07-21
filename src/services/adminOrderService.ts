import {getOrders, getOrderById, getOrdersByUser, updateOrderStatus as storageUpdateStatus, deleteOrder as storageDelete, addOrder,
} from "@/lib/storage/orders";
import { Order, OrderStatus } from "@/types/order";
export const adminOrderService = {
	getAll(): Order[] {
		return getOrders();
	},
	getById(id: string): Order | null {
		return getOrderById(id);
	},
	getByUser(userId: string): Order[] {
		return getOrdersByUser(userId);
	},
	updateStatus(id: string, status: OrderStatus): Order | null {
		return storageUpdateStatus(id, status);
	},
	delete(id: string): boolean {
		return storageDelete(id);
	},
	getByStatus(status: OrderStatus): Order[] {
		return getOrders().filter((o) => o.status === status);
	},
	getTotalRevenue(): number {
		return getOrders()
			.filter((o) => o.status === "delivered")
			.reduce((sum, o) => sum + o.total, 0);
	},
	getCount(): number {
		return getOrders().length;
	},
	getRevenueByMonth(months = 6): { month: string; revenue: number }[] {
		const orders = getOrders().filter((o) => o.status === "delivered");
		const result: { month: string; revenue: number }[] = [];
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
	getOrdersByMonth(months = 6): { month: string; orders: number }[] {
		const orders = getOrders();
		const result: { month: string; orders: number }[] = [];
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
};
