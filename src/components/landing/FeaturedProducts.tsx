import { defaultProducts } from "@/data/products";
import StarRating from "@/components/ui/StarRating";
import Link from "next/link";
export default function FeaturedProducts() {
    const featured = defaultProducts
        .filter((p) => p.isFeatured)
        .slice(0, 8);
    const discountedPrice = (price: number, discount: number) =>
        Math.round(price * (1 - discount / 100));
    return (
        <section className="bg-purple-500 py-10">
            <div className="container mx-auto px-4">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">
                        Featured Products
                    </h2>
                    <Link
                        href="/login"
                        className="text-sm text-purple-100 hover:underline"
                    >
                        View All
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
                    {featured.map((product) => (
                        <Link
                            key={product.id}
                            href="/login"
                            className="rounded-lg bg-white p-2 shadow-sm transition hover:shadow-md"
                        >
                            <div className="mx-auto mb-2 h-28 w-28 overflow-hidden rounded-md">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <p className="text-[10px] text-gray-500">
                                {product.brand}
                            </p>
                            <h3 className="mt-1 line-clamp-2 text-xs font-medium">
                                {product.name}
                            </h3>
                            <div className="mt-1">
                                <StarRating
                                    rating={product.rating}
                                    size={10}
                                    showValue
                                />
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-1">
                                <span className="text-sm font-semibold">
                                    ₹{discountedPrice(
                                        product.price,
                                        product.discount
                                    ).toLocaleString()}
                                </span>
                                {product.discount > 0 && (
                                    <span className="text-[10px] text-red-500">
                                        {product.discount}% OFF
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}