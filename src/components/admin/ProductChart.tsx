"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, } from "recharts";
import { CategoryRevenue } from "@/types/admin";
interface Props {
    data: CategoryRevenue[];
    topProducts: { name: string; brand: string; sold: number; revenue: number }[];
}
const COLORS = ["#7c3aed", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
function CustomTooltip({ active, payload }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-lg">
            <p className="mb-1 text-xs font-semibold text-gray-500">{payload[0].name}</p>
            <p className="text-sm font-bold text-gray-900">
                ₹{payload[0].value.toLocaleString("en-IN")}
            </p>
        </div>
    );
}
export default function ProductChart({ data, topProducts }: Props) {
    const hasData = data.length > 0 && data.some((d) => d.value > 0);
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="mb-4">
                    <p className="text-sm font-bold text-gray-900">Revenue by Category</p>
                    <p className="mt-0.5 text-xs text-gray-400">Share of delivered order revenue</p>
                </div>
                {!hasData ? (
                    <div className="flex h-[220px] flex-col items-center justify-center rounded-xl bg-gray-50 text-center">
                        <span className="text-3xl">🗂️</span>
                        <p className="mt-2 text-sm text-gray-400">
                            No category revenue yet
                        </p>
                    </div>
                ) : (
                    <>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    innerRadius={45}
                                    paddingAngle={3}
                                >
                                    {data.map((_, i) => (
                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {data.map((d, i) => (
                                <div key={d.category} className="flex items-center gap-1.5">
                                    <span
                                        className="h-2.5 w-2.5 rounded-full"
                                        style={{ background: COLORS[i % COLORS.length] }}
                                    />
                                    <span className="text-xs text-gray-600">{d.category}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="mb-4">
                    <p className="text-sm font-bold text-gray-900">Top Products</p>
                    <p className="mt-0.5 text-xs text-gray-400">By revenue from delivered orders</p>
                </div>
                {topProducts.length === 0 ? (
                    <div className="flex h-[220px] flex-col items-center justify-center rounded-xl bg-gray-50 text-center">
                        <span className="text-3xl">🛍️</span>
                        <p className="mt-2 text-sm text-gray-400">No sales data yet</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {topProducts.map((p, i) => {
                            const maxRevenue = topProducts[0].revenue;
                            const pct = Math.round((p.revenue / maxRevenue) * 100);
                            return (
                                <div key={p.name}>
                                    <div className="mb-1 flex items-center justify-between">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-500">
                                                {i + 1}
                                            </span>
                                            <div className="min-w-0">
                                                <p className="truncate text-xs font-semibold text-gray-800">
                                                    {p.name}
                                                </p>
                                                <p className="text-[10px] text-gray-400">{p.brand} · {p.sold} sold</p>
                                            </div>
                                        </div>
                                        <p className="ml-2 flex-shrink-0 text-xs font-bold text-gray-900">
                                            ₹{p.revenue.toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                    <div className="h-1.5 w-full rounded-full bg-gray-100">
                                        <div
                                            className="h-1.5 rounded-full bg-primary transition-all duration-500"
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
