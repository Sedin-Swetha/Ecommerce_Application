export const STATUS_CONFIG: Record<string, { label: string; icon: string; bg: string; text: string; border: string }> = {
  pending:    { label: "Pending",    icon: "🕐", bg: "bg-amber-50",   text: "text-amber-700",  border: "border-amber-200" },
  processing: { label: "Processing", icon: "⚙️", bg: "bg-blue-50",    text: "text-blue-700",   border: "border-blue-200"  },
  shipped:    { label: "Shipped",    icon: "🚚", bg: "bg-violet-50",  text: "text-violet-700", border: "border-violet-200" },
  delivered:  { label: "Delivered",  icon: "✅", bg: "bg-emerald-50", text: "text-emerald-700",border: "border-emerald-200"},
  cancelled:  { label: "Cancelled",  icon: "✕",  bg: "bg-red-50",     text: "text-red-600",    border: "border-red-200"   },
};
export const STEPS = ["pending", "processing", "shipped", "delivered"] as const;
export const PAYMENT_LABEL: Record<string, string> = {
  cod: "Cash on Delivery",
  upi: "UPI",
  card: "Credit / Debit Card",
};
export const PAYMENT_ICON: Record<string, string> = {
  cod: "💵", upi: "📱", card: "💳",
};
