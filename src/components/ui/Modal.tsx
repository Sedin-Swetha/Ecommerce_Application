"use client";
import { useEffect, useRef } from "react";
interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    size?: "sm" | "md" | "lg" | "xl";
    children: React.ReactNode;
}
const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
};
export default function Modal({
    open,
    onClose,
    title,
    size = "md",
    children,
}: ModalProps) {
    const panelRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open, onClose]);
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className={`
          relative w-full ${sizeClass[size]}
          overflow-hidden rounded-2xl border border-gray-100
          bg-white shadow-2xl
          animate-[fadeSlideUp_0.2s_ease_both]
        `}
            >
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <h2
                        id="modal-title"
                        className="text-base font-bold text-gray-900"
                    >
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                        aria-label="Close"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <div className="px-6 py-5 max-h-[80vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
