"use client";
import { useState, useEffect } from "react";
import { useWishlist } from "@/hooks/UseWishlist";
interface Props {
  productId: string;
  className?: string;
}
export default function WishlistButton({ productId, className = "" }: Props) {
  const { isWishlisted, toggleItem } = useWishlist();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const active = mounted ? isWishlisted(productId) : false;
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggleItem(productId);
      }}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={`flex items-center justify-center rounded-full bg-white/90 p-1.5 shadow transition-transform hover:scale-110 active:scale-95 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-4 w-4 transition-colors duration-200"
        fill={active ? "#ef4444" : "none"}
        stroke={active ? "#ef4444" : "#6b7280"}
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        />
      </svg>
    </button>
  );
}