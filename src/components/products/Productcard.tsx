"use client";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import WishlistButton from "@/components/wishlist/wishlistbutton";
interface Props {
  product: Product;
}
export default function ProductCard({ product }: Props) {
  const { addItem, increaseQuantity, decreaseQuantity, getQuantity } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const quantity = mounted ? getQuantity(product.id) : 0;
  const discountedPrice = Math.round(
    product.price - (product.price * product.discount) / 100
  );
  const savedAmount = product.price - discountedPrice;
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 h-full">
      <div className="relative w-full overflow-hidden bg-gray-50" style={{ paddingBottom: "55%" }}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"/>
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
          style={{ minHeight: "2.4rem" }}>
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
    </div>
  );
}