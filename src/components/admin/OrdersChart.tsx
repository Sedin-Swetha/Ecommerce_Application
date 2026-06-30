"use client";
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,Cell,} from "recharts";
import { OrdersByMonth } from "@/types/admin";
interface Props {
  data: OrdersByMonth[];
  statusBreakdown: { status: string; count: number }[];
}
const STATUS_COLORS: Record<string, string> = {
  pending:    "#f59e0b",
  processing: "#3b82f6",
  shipped:    "#8b5cf6",
  delivered:  "#10b981",
  cancelled:  "#ef4444",
};
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-lg">
      <p className="mb-1 text-xs font-semibold text-gray-500">{label}</p>
      <p className="text-sm font-bold text-blue-600">{payload[0].value} orders</p>
    </div>
  );
}
export default function OrdersChart({ data, statusBreakdown }: Props) {
  const total = data.reduce((sum, d) => sum + d.orders, 0);
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-sm font-bold text-gray-900">Orders Overview</p>
          <p className="mt-0.5 text-xs text-gray-400">Last 6 months</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-sm font-bold text-blue-600">{total} orders</p>
        </div>
      </div>
      {total === 0 ? (
        <EmptyState />
      ) : (
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
            <Bar dataKey="orders" radius={[6, 6, 0, 0]} fill="#3b82f6" maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      )}
      {statusBreakdown.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
          {statusBreakdown.map((s) => (
            <div
              key={s.status}
              className="flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-3 py-1"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: STATUS_COLORS[s.status] ?? "#94a3b8" }}
              />
              <span className="text-xs font-medium capitalize text-gray-600">
                {s.status}
              </span>
              <span className="text-xs font-bold text-gray-900">{s.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function EmptyState() {
  return (
    <div className="flex h-[180px] flex-col items-center justify-center rounded-xl bg-gray-50 text-center">
      <span className="text-3xl">📦</span>
      <p className="mt-2 text-sm text-gray-400">No orders yet</p>
    </div>
  );
}
