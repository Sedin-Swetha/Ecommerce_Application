"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import { Order } from "@/types/order";
import { useOrders } from "@/hooks/UseOrders";
import { CancelModal } from "@/components/ui/CancelModal";
import { Toast } from "@/components/ui/Toast";
import { STATUS_CONFIG, STEPS, PAYMENT_LABEL, PAYMENT_ICON } from "@/constants/order";
interface Props { order: Order; }
export default function OrderDetail({ order }: Props) {
  const { cancelOrder } = useOrders();
  const [currentStatus, setCurrentStatus] = useState(order.status);
  const [modalOpen, setModalOpen]         = useState(false);
  const [cancelling, setCancelling]       = useState(false);
  const [showToast, setShowToast]         = useState(false);
  const status      = STATUS_CONFIG[currentStatus] ?? STATUS_CONFIG.pending;
  const stepIndex   = STEPS.indexOf(currentStatus as typeof STEPS[number]);
  const isCancelled = currentStatus === "cancelled";
  const isPending   = currentStatus === "pending";
  const progressPct = stepIndex >= 0 ? (stepIndex / (STEPS.length - 1)) * 100 : 0;
  const handleConfirmCancel = useCallback(async () => {
    setCancelling(true);
    try {
      await cancelOrder(order.id);
      setCurrentStatus("cancelled");
      setModalOpen(false);
      setShowToast(true);
    } finally {
      setCancelling(false);
    }
  }, [cancelOrder, order.id]);
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-violet-500 to-blue-400" />
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">Order ID</p>
              <p className="font-mono text-lg font-bold text-gray-900">{order.id}</p>
              <p className="text-xs text-gray-500">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric", month: "long", year: "numeric",
                })}
              </p>
            </div>
            <div className={`inline-flex items-center gap-2 self-start rounded-full border px-4 py-1.5 text-sm font-semibold sm:self-auto ${status.bg} ${status.text} ${status.border}`}>
              <span>{status.icon}</span>
              <span>{status.label}</span>
            </div>
          </div>
        </div>
        {isCancelled && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4">
            <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-red-700">Order cancelled</p>
              <p className="mt-0.5 text-xs leading-relaxed text-red-600">
                Your refund of{" "}
                <span className="font-semibold">₹{order.total.toLocaleString("en-IN")}</span>{" "}
                will be returned to your {PAYMENT_LABEL[order.paymentMethod] ?? order.paymentMethod} within 5–7 business days.
              </p>
            </div>
          </div>
        )}
        {!isCancelled && (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-gray-400">Delivery Progress</p>
            <div className="relative flex items-start justify-between">
              <div className="absolute left-0 right-0 top-[18px] h-[2px] bg-gray-100" />
              <div
                className="absolute left-0 top-[18px] h-[2px] bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-700"
                style={{ width: `${progressPct}%` }}
              />
              {STEPS.map((step, i) => {
                const done   = i < stepIndex;
                const active = i === stepIndex;
                return (
                  <div key={step} className="relative z-10 flex flex-col items-center gap-2" style={{ width: "25%" }}>
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300 ${
                      done   ? "border-blue-500 bg-blue-500 text-white" :
                      active ? "border-violet-500 bg-violet-500 text-white shadow-lg shadow-violet-200" :
                               "border-gray-200 bg-white text-gray-400"
                    }`}>
                      {done ? "✓" : i + 1}
                    </div>
                    <span className={`text-center text-[10px] font-semibold capitalize leading-tight ${done || active ? "text-gray-800" : "text-gray-400"}`}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <p className="text-sm font-bold text-gray-900">
              Items{" "}
              <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
                {order.items.length}
              </span>
            </p>
          </div>
          <div className="divide-y divide-gray-50">
            {order.items.map((item, i) => (
              <div key={`${item.productId}-${i}`} className="flex items-center gap-4 px-6 py-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500">{item.brand}</p>
                  <p className="truncate text-sm font-semibold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900">
                    ₹{(item.discountedPrice * item.quantity).toLocaleString("en-IN")}
                  </p>
                  {item.price !== item.discountedPrice && (
                    <p className="text-[11px] text-gray-400 line-through">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-400">Shipping Address</p>
            <div className="flex flex-col gap-1 text-sm text-gray-700 leading-relaxed">
              <p className="font-bold text-gray-900">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
              <p className="text-gray-500">PIN {order.shippingAddress.pincode}</p>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-gray-600">
                <span>📞</span>
                <span>{order.shippingAddress.phone}</span>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-400">Price Breakdown</p>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className={order.shippingCharge === 0 ? "font-semibold text-emerald-600" : ""}>
                  {order.shippingCharge === 0 ? "FREE" : `₹${order.shippingCharge}`}
                </span>
              </div>
              <div className="my-1 h-px bg-gray-100" />
              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span>₹{order.total.toLocaleString("en-IN")}</span>
              </div>
              <div className="mt-2 flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5">
                <span className="text-base">{PAYMENT_ICON[order.paymentMethod] ?? "💳"}</span>
                <span className="text-xs font-semibold text-gray-700">
                  {PAYMENT_LABEL[order.paymentMethod] ?? order.paymentMethod}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 pb-4">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Orders
          </Link>
          {isPending && (
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-100"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
              Cancel Order
            </button>
          )}
        </div>
      </div>
      <CancelModal
        open={modalOpen}
        loading={cancelling}
        onKeep={() => setModalOpen(false)}
        onConfirm={handleConfirmCancel}
      />
      <Toast show={showToast} onDone={() => setShowToast(false)} />
    </>
  );
}
