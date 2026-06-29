"use client";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import WishlistButton from "@/components/wishlist/wishlistbutton";
interface Props {
  product: Product;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}
export default function ProductCard({ product, isAdmin = false, onEdit, onDelete }: Props) {
  const { addItem, increaseQuantity, decreaseQuantity, getQuantity } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const quantity        = mounted ? getQuantity(product.id) : 0;
  const discountedPrice = Math.round(product.price - (product.price * product.discount) / 100);
  const savedAmount     = product.price - discountedPrice;
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 h-full">
      <div className="relative w-full overflow-hidden bg-gray-50" style={{ paddingBottom: "55%" }}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {product.discount > 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">
            {product.discount}% OFF
          </span>
        )}
        {mounted && (
          <WishlistButton productId={product.id} className="absolute right-2 top-2" />
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3 gap-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-primary leading-none">
          {product.brand}
        </p>
        <h3
          className="line-clamp-2 text-sm font-semibold leading-tight text-gray-900"
          style={{ minHeight: "2.4rem" }}
        >
          {product.name}
        </h3>
        <span className="inline-flex w-fit items-center gap-0.5 rounded-md bg-green-600 px-1.5 py-0.5 text-[10px] font-medium text-white">
          ⭐ {product.rating}
        </span>
        <div className="flex items-baseline gap-2 mt-0.5">
          <p className="text-lg font-bold text-gray-900 leading-none">
            ₹{discountedPrice.toLocaleString("en-IN")}
          </p>
          {product.discount > 0 && (
            <span className="text-[11px] text-gray-400 line-through leading-none">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {product.discount > 0 && (
            <span className="text-[11px] font-medium text-green-600">
              Save ₹{savedAmount.toLocaleString("en-IN")}
            </span>
          )}
          {product.stock > 0 && (
            <span className="text-[11px] font-medium text-green-600">
              In Stock ({product.stock})
            </span>
          )}
        </div>
        <div className="mt-auto pt-2">
          {product.stock === 0 ? (
            <button
              disabled
              className="w-full cursor-not-allowed rounded-lg bg-gray-200 py-2 text-xs font-medium text-gray-500"
            >
              Out Of Stock
            </button>
          ) : !mounted || quantity === 0 ? (
            <button
              onClick={(e) => { e.preventDefault(); addItem(product.id); }}
              className="w-full rounded-lg bg-primary py-2 text-sm font-semibold text-white transition hover:bg-primary-dark active:scale-95"
            >
              Add To Cart
            </button>
          ) : (
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-0.5">
              <button
                onClick={(e) => { e.preventDefault(); decreaseQuantity(product.id); }}
                className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-base font-bold text-gray-700 shadow-sm hover:bg-gray-100"
              >
                −
              </button>
              <span className="text-sm font-bold text-gray-900">{quantity}</span>
              <button
                onClick={(e) => { e.preventDefault(); increaseQuantity(product.id); }}
                className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-white hover:bg-primary-dark"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
      {isAdmin && (
        <div className="flex gap-2 border-t border-gray-100 px-3 py-2">
          <button
            onClick={(e) => { e.preventDefault(); onEdit?.(); }}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100 transition"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit
          </button>
          <button
            onClick={(e) => { e.preventDefault(); onDelete?.(); }}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
            </svg>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}