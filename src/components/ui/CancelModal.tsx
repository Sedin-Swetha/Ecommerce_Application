"use client";
import { useEffect } from "react";
interface CancelModalProps {
  open: boolean;
  loading: boolean;
  onKeep: () => void;
  onConfirm: () => void;
}
export function CancelModal({ open, loading, onKeep, onConfirm }: CancelModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onKeep(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onKeep]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onKeep}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancel-modal-title"
        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl animate-[fadeSlideUp_0.2s_ease_both]"
      >
        <div className="h-1 w-full bg-red-400" />
        <div className="p-6">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 border border-red-100">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <h2 id="cancel-modal-title" className="mb-1.5 text-center text-base font-bold text-gray-900">
            Cancel this order?
          </h2>
          <p className="mb-1 text-center text-sm text-gray-500 leading-relaxed">
            Your refund will be processed within{" "}
            <span className="font-semibold text-gray-700">5–7 business days</span>.
          </p>
          <p className="mb-6 text-center text-xs text-gray-400">This action cannot be undone.</p>
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <button
              onClick={onKeep}
              disabled={loading}
              className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
            >
              Keep Order
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 border border-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Cancelling…
                </>
              ) : (
                "Yes, Cancel Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
