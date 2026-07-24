"use client";
import { useState } from "react";
import { OrderItem } from "@/types/order";
interface Props {
    items: OrderItem[];
    subtotal: number;
    shippingCharge: number;
    total: number;
    appliedCouponCode?: string;
    couponDiscountValue?: number;
    onApplyCoupon?: (code: string) => void;
    onRemoveCoupon?: () => void;
    couponError?: string;
}
export default function CheckoutSummary({ 
    items, subtotal, shippingCharge, total, 
    appliedCouponCode, couponDiscountValue = 0, 
    onApplyCoupon, onRemoveCoupon, couponError 
}: Props) {
    const [couponInput, setCouponInput] = useState("");
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
                            <span>Product Discount</span>
                            <span>− ₹{totalSavings.toLocaleString("en-IN")}</span>
                        </div>
                    )}
                    {appliedCouponCode && couponDiscountValue > 0 && (
                        <div className="flex justify-between text-sm font-medium text-blue-600">
                            <span>Coupon ({appliedCouponCode})</span>
                            <span>− ₹{couponDiscountValue.toLocaleString("en-IN")}</span>
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
                            ₹{total.toLocaleString("en-IN")}
                        </span>
                    </div>
                </div>
                {(shippingCharge === 0 || totalSavings > 0 || couponDiscountValue > 0) && (
                    <div className="mt-3 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-2.5 flex items-center gap-2">
                        <span>🎉</span>
                        <p className="text-[11px] font-semibold text-emerald-700">
                            You're saving ₹{(totalSavings + couponDiscountValue).toLocaleString("en-IN")} on this order!
                        </p>
                    </div>
                )}
                
                {/* Coupon Section */}
                <div className="mt-5 border-t border-gray-100 pt-5">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">Apply Coupon</h3>
                    {appliedCouponCode ? (
                        <div className="flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
                            <div className="flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-blue-600"><path d="M20 6L9 17l-5-5"/></svg>
                                <span className="text-sm font-bold text-blue-900 uppercase">{appliedCouponCode}</span>
                            </div>
                            <button onClick={onRemoveCoupon} className="text-xs font-semibold text-red-500 hover:text-red-700">Remove</button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={couponInput}
                                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                                    placeholder="Enter code"
                                    className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm uppercase placeholder:normal-case focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <button
                                    onClick={() => onApplyCoupon?.(couponInput)}
                                    disabled={!couponInput.trim()}
                                    className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50"
                                >
                                    Apply
                                </button>
                            </div>
                            {couponError && (
                                <p className="text-xs font-medium text-red-500 pl-1">{couponError}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}