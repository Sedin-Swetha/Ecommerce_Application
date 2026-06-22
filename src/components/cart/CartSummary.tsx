"use client";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { defaultProducts } from "@/data/products";
export default function CartSummary() {
    const { cart, clearCart } = useCart();
    const router = useRouter();
    const total = cart.reduce((sum, item) => {
        const product = defaultProducts.find((p) => p.id === item.productId);
        if (!product) return sum;
        const price = Math.round(
            product.price - (product.price * product.discount) / 100
        );
        return sum + price * item.quantity;
    }, 0);
    const delivery = total > 499 ? 0 : 49;
    const finalTotal = total + delivery;
    return (
        <div className="rounded-xl border bg-white p-5 space-y-4 sticky top-20">
            <h2 className="font-bold text-gray-900">Order Summary</h2>

            <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className={delivery === 0 ? "text-green-600" : ""}>
                        {delivery === 0 ? "Free" : `₹${delivery}`}
                    </span>
                </div>
                {delivery > 0 && (
                    <p className="text-xs text-gray-400">
                        Add ₹{499 - total} more for free delivery
                    </p>
                )}
            </div>
            <div className="flex justify-between font-bold text-gray-900 border-t pt-3">
                <span>Total</span>
                <span>₹{finalTotal.toLocaleString()}</span>
            </div>
            <button
                onClick={() => router.push("/checkout")}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition">
                Proceed to Checkout
            </button>
            <button
                onClick={clearCart}
                className="w-full text-sm text-gray-400 hover:text-red-500 transition">
                Clear Cart
            </button>
        </div>
    );
}

