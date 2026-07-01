"use client";
import { useState, useEffect } from "react";
export type ToastType = "success" | "info" | "error";
interface ToastProps {
    show: boolean;
    message: string;
    type?: ToastType;
    onDone: () => void;
}
const ICON_BG: Record<ToastType, string> = {
    success: "bg-emerald-500",
    info: "bg-blue-500",
    error: "bg-red-500",
};
const ICON_GLYPH: Record<ToastType, string> = {
    success: "✓",
    info: "i",
    error: "!",
};
export function Toast({ show, message, type = "success", onDone }: ToastProps) {
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
            className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 pointer-events-none flex items-center gap-2.5 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${ICON_BG[type]}`}>{ICON_GLYPH[type]}</span>
            {message}
        </div>
    );
}