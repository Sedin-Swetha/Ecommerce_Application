"use client";
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,} from "recharts";
import { RevenueByMonth } from "@/types/admin";
interface Props {
  data: RevenueByMonth[];
}
function formatY(value: number): string {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000)   return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value}`;
}
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-lg">
      <p className="mb-1 text-xs font-semibold text-gray-500">{label}</p>
      <p className="text-sm font-bold text-primary">
        ₹{payload[0].value.toLocaleString("en-IN")}
      </p>
    </div>
  );
}
export default function RevenueChart({ data }: Props) {
  const total = data.reduce((sum, d) => sum + d.revenue, 0);
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-sm font-bold text-gray-900">Revenue Overview</p>
          <p className="mt-0.5 text-xs text-gray-400">Last 6 months</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-sm font-bold text-primary">
            ₹{total.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
      {total === 0 ? (
        <EmptyState message="No revenue data yet. Revenue appears after orders are delivered." />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatY}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#7c3aed"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#7c3aed", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#7c3aed" }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex h-[220px] flex-col items-center justify-center rounded-xl bg-gray-50 text-center">
      <span className="text-3xl">📈</span>
      <p className="mt-2 text-sm text-gray-400">{message}</p>
    </div>
  );
}
