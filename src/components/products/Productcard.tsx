import { Product } from "@/types/product";
interface Props {
	product: Product;
}
export default function ProductCard({ product }: Props) {
	const discountedPrice = product.price -(product.price * product.discount) / 100;
	return (
		<div className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition">
			<img
				src={product.images[0]}
				alt={product.name}
				className="h-48 w-full rounded-lg object-cover"/>
			<h3 className="mt-3 text-lg font-semibold">
				{product.name}
			</h3>
			<p className="text-sm text-gray-500">
				{product.brand}
			</p>
			<div className="mt-2 flex items-center gap-2">
				<span className="text-lg font-bold">
					₹{discountedPrice}
				</span>
				{product.discount > 0 && (
					<span className="text-sm text-gray-400 line-through">
						₹{product.price}
					</span>
				)}
			</div>
			<p className="mt-2 text-yellow-500">
				⭐ {product.rating}
			</p>
			<p className="mt-1 text-sm">
				Stock: {product.stock}
			</p>
		</div>
	);
}