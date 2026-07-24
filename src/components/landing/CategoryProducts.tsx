"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { categoriesAtom } from "@/store/CategoryAtom";
import { productsAtom } from "@/store/ProductAtom";
import StarRating from "@/components/ui/StarRating";
const discountedPrice = (price: number, discount: number) =>
    Math.round(price * (1 - discount / 100));
export default function CategoryProducts() {
    const categories = useAtomValue(categoriesAtom);
    const products = useAtomValue(productsAtom);
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);
    if (!hasMounted) {
        return (
            <section className="bg-gray-50 dark:bg-transparent py-10">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center py-10 text-sm text-gray-400 dark:text-gray-500">
                        Loading products...
                    </div>
                </div>
            </section>
        );
    }
    return (
        <section className="bg-gray-50 dark:bg-transparent py-10">
            <div className="container mx-auto px-4 space-y-10">
                {categories.map((category) => {
                    const categoryProducts = products
                        .filter((p) => p.categoryId === category.id)
                        .slice(0, 4);
                    if (categoryProducts.length === 0) return null;
                    return (
                        <div key={category.id}>
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    {category.image && (
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="h-7 w-7 object-contain"
                                        />
                                    )}
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                        {category.name}
                                    </h2>
                                </div>
                                <Link
                                    href={`/products?category=${category.id}`}
                                    className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                                >
                                    See all
                                    <svg
                                        width="14" height="14" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2.5"
                                    >
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                                {categoryProducts.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/products/${product.id}`}
                                        className="group rounded-xl border border-gray-100 dark:border-gray-800
                               bg-white dark:bg-gray-900 p-3 shadow-sm transition
                               hover:shadow-md hover:border-primary/20 dark:hover:border-primary/40"
                                    >
                                        <div className="relative mb-3 h-36 w-full overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            {product.discount > 0 && (
                                                <span className="absolute top-2 left-2 rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                                                    {product.discount}% OFF
                                                </span>
                                            )}
                                            {product.isFeatured && (
                                                <span className="absolute top-2 right-2 rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                                            {product.brand}
                                        </p>
                                        <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold text-gray-800 dark:text-white leading-snug">
                                            {product.name}
                                        </h3>
                                        <div className="mt-1.5">
                                            <StarRating rating={product.rating} size={10} showValue />
                                        </div>
                                        <div className="mt-2 flex flex-wrap items-baseline gap-1.5">
                                            <span className="text-base font-bold text-gray-900 dark:text-white">
                                                ₹{discountedPrice(product.price, product.discount).toLocaleString("en-IN")}
                                            </span>
                                            {product.discount > 0 && (
                                                <span className="text-xs text-gray-400 line-through">
                                                    ₹{product.price.toLocaleString("en-IN")}
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}