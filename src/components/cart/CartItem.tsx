"use client";
import { CartItem as CartItemType } from "@/types/product";
import { defaultProducts } from "@/data/products";
import { useCart } from "@/hooks/useCart";
interface Props { item: CartItemType }
export default function CartItem({ item }: Props) {
    const { updateQuantity, removeItem } = useCart();
    const product = defaultProducts.find((p) => p.id === item.productId);
    if (!product) return null;
    const price = Math.round(product.price - (product.price * product.discount) / 100);
    const subtotal = price * item.quantity;
    return (
        <div className="flex items-center gap-4 rounded-xl border bg-white p-4">
            <img
                src={product.images[0]}
                alt={product.name}
                className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 line-clamp-2">{product.name}</p>
                <p className="text-sm text-blue-600 font-bold mt-1">₹{price.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-gray-50"
                >−</button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-gray-50"
                >+</button>
            </div>
            <p className="font-bold text-gray-900 w-24 text-right">
                ₹{subtotal.toLocaleString()}
            </p>
            <button
                onClick={() => removeItem(item.productId)}
                className="text-red-400 hover:text-red-600 text-sm"
            >✕</button>
        </div>
    );
}
