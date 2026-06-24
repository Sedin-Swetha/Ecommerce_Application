"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/UseOrders";
import OrderDetail from "@/components/orders/OrderDetail";
import { Order } from "@/types/order";
export default function OrderDetailPage() {
    const { user } = useAuth();
    const { getOrderById } = useOrders();
    const router = useRouter();
    const params = useParams();
    const orderId = params.id as string;
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    useEffect(() => {
        if (mounted && !user) {
            router.push("/login");
        }
    }, [mounted, user, router]);
    useEffect(() => {
        if (!mounted || !user) return;
        const timer = setTimeout(() => {
            const found = getOrderById(orderId);
            setOrder(found);
            setIsLoading(false);
        }, 100);
        return () => clearTimeout(timer);
    }, [mounted, user, orderId, getOrderById]);
    if (!mounted) {
        return (
            <div className="flex items-center justify-center py-20">
                Loading...
            </div>
        );
    }
    if (!user) {
        return null;
    }
    if (isLoading) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-10">
                <div className="flex animate-pulse flex-col gap-4">
                    <div className="h-8 w-48 rounded-lg bg-gray-200" />
                    <div className="h-32 rounded-2xl bg-gray-100" />
                    <div className="h-48 rounded-2xl bg-gray-100" />
                    <div className="h-32 rounded-2xl bg-gray-100" />
                </div>
            </div>
        );
    }
    if (!order) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-10 text-center">
                <p className="text-lg font-semibold text-gray-700">
                    Order not found.
                </p>
                <p className="mt-1 text-sm text-gray-400">
                    The order may have been cleared or doesn't exist.
                </p>
                <button
                    onClick={() => router.push("/orders")}
                    className="mt-4 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                    Back to Orders
                </button>
            </div>
        );
    }
    return (
        <div className="mx-auto max-w-3xl px-4 py-10">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">
                Order Details
            </h1>
            <OrderDetail order={order} />
        </div>
    );
}