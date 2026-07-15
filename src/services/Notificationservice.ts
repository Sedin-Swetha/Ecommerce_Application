import { AppNotification, NotificationType } from "@/types/notification";
function baseFields() {
    return {
        id: crypto.randomUUID(),
        read: false,
        createdAt: new Date().toISOString(),
    };
}
export function createOrderPlacedNotification(orderId: string, userId: string): AppNotification {
    return {
        ...baseFields(),
        type: NotificationType.ORDER_PLACED,
        title: "Order placed",
        message: `Your order #${orderId} has been placed successfully.`,
        link: `/orders/${orderId}`,
        audience: "user",
        userId,
    };
}
export function createOrderStatusNotification(orderId: string, userId: string, status: string): AppNotification {
    return {
        ...baseFields(),
        type: NotificationType.ORDER_STATUS_CHANGED,
        title: "Order updated",
        message: `Order #${orderId} is now ${status}.`,
        link: `/orders/${orderId}`,
        audience: "user",
        userId,
    };
}
export function createLowStockNotification(productName: string, stock: number): AppNotification {
    return {
        ...baseFields(),
        type: NotificationType.LOW_STOCK,
        title: "Low stock alert",
        message: stock === 0
            ? `${productName} is out of stock.`
            : `${productName} has only ${stock} left.`,
        link: "/products",
        audience: "admin",
    };
}
export function createNewOrderNotification(orderId: string): AppNotification {
    return {
        ...baseFields(),
        type: NotificationType.NEW_ORDER,
        title: "New order received",
        message: `Order #${orderId} needs processing.`,
        link: "/orders",
        audience: "admin",
    };
}
export function createSaleNotification(title: string, message: string, link = "/products"): AppNotification {
    return {
        ...baseFields(),
        type: NotificationType.SALE,
        title,
        message,
        link,
        audience: "broadcast",
    };
}
export function createAutoSaleNotification(productName: string, discount: number): AppNotification {
    return createSaleNotification(
        "Sale!",
        `${discount}% off on ${productName} right now.`,
        "/products"
    );
}