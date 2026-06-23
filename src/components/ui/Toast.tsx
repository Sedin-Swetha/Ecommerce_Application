"use client";
import { useState, useEffect } from "react";
interface ToastProps {
  show: boolean;
  onDone: () => void;
}
export function Toast({ show, onDone }: ToastProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!show) return;
    setVisible(true);
    const hide = setTimeout(() => setVisible(false), 3000);
    const done = setTimeout(() => onDone(), 3400);
    return () => { clearTimeout(hide); clearTimeout(done); };
  }, [show, onDone]);
  return (
    <div
      role="status"
      aria-live="polite"
      className={`
        fixed bottom-6 left-1/2 z-50 -translate-x-1/2 pointer-events-none
        flex items-center gap-2.5 rounded-xl bg-gray-900 px-5 py-3
        text-sm font-semibold text-white shadow-lg transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
        ✓
      </span>
      Order cancelled successfully
    </div>
  );
}
