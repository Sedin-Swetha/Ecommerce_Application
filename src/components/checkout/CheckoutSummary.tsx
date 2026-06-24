"use client";
import { OrderItem } from "@/types/order";
interface Props {
    items: OrderItem[];
    subtotal: number;
    shippingCharge: number;
    total: number;
}
export default function CheckoutSummary({ items, subtotal, shippingCharge, total }: Props) {
    const totalSavings = items.reduce(
        (sum, item) => sum + (item.price - item.discountedPrice) * item.quantity, 0
    );
    return (
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-primary to-secondary" />
            <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">
                    Order Summary
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                    {items.length} {items.length === 1 ? "item" : "items"}
                </p>
            </div>
            <div className="divide-y divide-gray-50 px-5">
                {items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-3 py-3">
                        <img
                            src={item.image}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="h-12 w-12 shrink-0 rounded-lg object-cover border border-gray-100 bg-gray-50"
                        />
                        <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                            <p className="line-clamp-1 text-xs font-semibold text-gray-800 leading-tight">
                                {item.name}
                            </p>
                            <p className="text-[11px] text-gray-400">Qty: {item.quantity}</p>
                            {item.price !== item.discountedPrice && (
                                <p className="text-[11px] text-gray-400 line-through">
                                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                </p>
                            )}
                        </div>
                        <p className="text-xs font-bold text-gray-900 shrink-0">
                            ₹{(item.discountedPrice * item.quantity).toLocaleString("en-IN")}
                        </p>
                    </div>
                ))}
            </div>
            <div className="px-5 pt-3 pb-5">
                <div className="rounded-xl bg-gray-50 p-4 flex flex-col gap-2.5">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    {totalSavings > 0 && (
                        <div className="flex justify-between text-sm font-medium text-emerald-600">
                            <span>Discount</span>
                            <span>− ₹{totalSavings.toLocaleString("en-IN")}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Shipping</span>
                        <span className={shippingCharge === 0 ? "font-semibold text-emerald-600" : "text-gray-800"}>
                            {shippingCharge === 0 ? "FREE" : `₹${shippingCharge.toLocaleString("en-IN")}`}
                        </span>
                    </div>
                    <div className="border-t border-gray-200 pt-2.5 flex justify-between font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-base">
                            ₹{(subtotal + shippingCharge).toLocaleString("en-IN")}
                        </span>
                    </div>
                </div>
                {(shippingCharge === 0 || totalSavings > 0) && (
                    <div className="mt-3 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-2.5 flex items-center gap-2">
                        <span>🎉</span>
                        <p className="text-[11px] font-semibold text-emerald-700">
                            {shippingCharge === 0 && totalSavings > 0
                                ? `You're saving ₹${totalSavings.toLocaleString("en-IN")} + free shipping!`
                                : shippingCharge === 0
                                    ? "You got free shipping!"
                                    : `You're saving ₹${totalSavings.toLocaleString("en-IN")} on this order!`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}