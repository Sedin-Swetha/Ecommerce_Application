"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from "@/hooks/UseWishlist";
import WishlistItem from "@/components/wishlist/wishlistitem";
import { useAtomValue } from "jotai";
import { productsAtom } from "@/store/ProductAtom";
import { UserRole } from "@/types/enums";
import Link from "next/link";
export default function WishlistPage() {
    const { user } = useAuth();
    const { wishlist, clearWishlist } = useWishlist();
    const products = useAtomValue(productsAtom);
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const wishlistedProducts = products.filter((p) =>
        wishlist.includes(p.id)
    );
    useEffect(() => {
        setMounted(true);
    }, []);
    useEffect(() => {
        if (!mounted) return;
        if (!user) {
            router.push("/login?redirect=/wishlist");
            return;
        }
        if (user.role === UserRole.ADMIN) {
            router.push("/admin");
        }
    }, [mounted, user, router]);
    if (!mounted) {
        return (
            <div className="flex items-center justify-center py-20">Loading...</div>
        );
    }
    if (!user || user.role === "admin") return null;
    if (wishlistedProducts.length === 0) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    />
                </svg>
                <h2 className="text-xl font-bold text-gray-800">Your wishlist is empty</h2>
                <p className="text-sm text-gray-500">Save items you love and come back to them anytime.</p>
                <Link
                    href="/products"
                    className="mt-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition"
                >
                    Browse Products
                </Link>
            </div>
        );
    }
    return (
        <div className="mx-auto max-w-2xl px-4 py-8">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        {wishlistedProducts.length} {wishlistedProducts.length === 1 ? "item" : "items"}
                    </p>
                </div>
                <button
                    onClick={clearWishlist}
                    className="text-xs font-medium text-red-500 hover:text-red-600 transition"
                >
                    Clear All
                </button>
            </div>
            <div className="flex flex-col gap-3">
                {wishlistedProducts.map((product) => (
                    <WishlistItem key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}