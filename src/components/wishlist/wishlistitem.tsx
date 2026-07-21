"use client";
import { Product } from "@/types/product";
import { useWishlist } from "@/hooks/UseWishlist";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
interface Props {
	product: Product;
}
export default function WishlistItem({ product }: Props) {
	const { removeItem } = useWishlist();
	const { addItem, getQuantity } = useCart();
	const discountedPrice = Math.round(product.price - (product.price * product.discount) / 100);
	const savedAmount = product.price - discountedPrice;
	const inCart = getQuantity(product.id) > 0;
	return (
		<div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
			<Link href={`/products/${product.id}`} className="shrink-0">
				<div className="h-20 w-20 overflow-hidden rounded-lg bg-gray-50">
					<img
						src={product.images[0]}
						alt={product.name}
						className="h-full w-full object-cover"
					/>
				</div>
			</Link>
			<div className="flex flex-1 flex-col gap-0.5 min-w-0">
				<p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
					{product.brand}
				</p>
				<Link href={`/products/${product.id}`}>
					<h3 className="line-clamp-2 text-sm font-semibold text-gray-900 hover:text-primary">
						{product.name}
					</h3>
				</Link>
				<div className="flex items-baseline gap-2 mt-0.5">
					<span className="text-base font-bold text-gray-900">
						₹{discountedPrice.toLocaleString("en-IN")}
					</span>
					{product.discount > 0 && (
						<>
							<span className="text-xs text-gray-400 line-through">
								₹{product.price.toLocaleString("en-IN")}
							</span>
							<span className="text-xs font-medium text-green-600">
								Save ₹{savedAmount.toLocaleString("en-IN")}
							</span>
						</>
					)}
				</div>
				{product.stock === 0 && (
					<span className="text-xs font-medium text-red-500">Out of Stock</span>
				)}
			</div>
			<div className="flex shrink-0 flex-col items-end gap-2">
				<button
					onClick={() => removeItem(product.id)}
					aria-label="Remove from wishlist"
					className="text-gray-400 hover:text-red-500 transition-colors"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
				{product.stock > 0 && (
					<button
						onClick={() => addItem(product.id)}
						disabled={inCart}
						className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${inCart
							? "bg-green-100 text-green-700 cursor-default"
							: "bg-primary text-white hover:bg-primary-dark active:scale-95"
							}`}
					>
						{inCart ? "✓ In Cart" : "Add to Cart"}
					</button>
				)}
			</div>
		</div>
	);
}