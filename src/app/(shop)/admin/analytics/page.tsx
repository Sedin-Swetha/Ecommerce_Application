"use client";
import { useMemo } from "react";
import { adminAnalyticsService } from "@/services/adminAnalyticsService";
import StatsCard from "@/components/admin/StatsCard";
import RevenueChart from "@/components/admin/RevenueChart";
import OrdersChart from "@/components/admin/OrdersChart";
import ProductChart from "@/components/admin/ProductChart";
export default function AnalyticsPage() {
    const summary = useMemo(() => adminAnalyticsService.getSummary(), []);
    const revenueByMonth = useMemo(() => adminAnalyticsService.getRevenueByMonth(), []);
    const ordersByMonth = useMemo(() => adminAnalyticsService.getOrdersByMonth(), []);
    const revenueByCategory = useMemo(() => adminAnalyticsService.getRevenueByCategory(), []);
    const topProducts = useMemo(() => adminAnalyticsService.getTopProducts(), []);
    const statusBreakdown = useMemo(() => adminAnalyticsService.getOrderStatusBreakdown(), []);
    const stats = [
        {
            label: "Total Revenue",
            value: `₹${summary.totalRevenue.toLocaleString("en-IN")}`,
            icon: "💰",
            growth: summary.revenueGrowth,
            bg: "bg-emerald-50",
            text: "text-emerald-700",
            border: "border-emerald-200",
        },
        {
            label: "Total Orders",
            value: summary.totalOrders,
            icon: "📦",
            growth: summary.ordersGrowth,
            bg: "bg-blue-50",
            text: "text-blue-700",
            border: "border-blue-200",
        },
        {
            label: "Total Products",
            value: summary.totalProducts,
            icon: "🛍️",
            sub: "In your catalogue",
            bg: "bg-violet-50",
            text: "text-violet-700",
            border: "border-violet-200",
        },
        {
            label: "Avg Order Value",
            value: summary.totalOrders > 0
                ? `₹${Math.round(summary.totalRevenue / summary.totalOrders).toLocaleString("en-IN")}`
                : "₹0",
            icon: "📊",
            sub: "Per delivered order",
            bg: "bg-amber-50",
            text: "text-amber-700",
            border: "border-amber-200",
        },
    ];

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Live data from your store — updates as orders are placed and delivered.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((s) => (
                    <StatsCard key={s.label} {...s} />
                ))}
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <RevenueChart data={revenueByMonth} />
                <OrdersChart data={ordersByMonth} statusBreakdown={statusBreakdown} />
            </div>
            <ProductChart data={revenueByCategory} topProducts={topProducts} />
        </div>
    );
}
