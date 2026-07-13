"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { UserRole } from "@/types/enums";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import Link from "next/link";
export default function CartPage() {
    const { user } = useAuth();
    const { cart } = useCart();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    useEffect(() => {
        if (!mounted) return;
        if (!user) {
            router.push("/login?redirect=/cart");
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
    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <p className="text-5xl mb-4">🛒</p>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 text-sm mb-6">Add items to get started</p>
                <Link
                    href="/products"
                    className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark" >
                    Shop Now
                </Link>
            </div>
        );
    }
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Shopping Cart ({cart.length} items)
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <CartItem key={item.productId} item={item} />
                    ))}
                </div>
                <CartSummary />
            </div>
        </div>
    );
}