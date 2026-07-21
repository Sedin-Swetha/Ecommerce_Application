"use client";
import { useAtom, useAtomValue } from "jotai";
import { cartAtomWithSync, cartCountAtom } from "@/store/cartAtom";
export const useCart = () => {
    const [cart, setCart] = useAtom(cartAtomWithSync);
    const count = useAtomValue(cartCountAtom);
    const addItem = (productId: string) => {
        setCart(
            cart.some((i) => i.productId === productId)
                ? cart.map((i) => i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i)
                : [...cart, { productId, quantity: 1 }]
        );
    };
    const removeItem = (productId: string) =>
        setCart(cart.filter((i) => i.productId !== productId));
    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) { removeItem(productId); return; }
        setCart(cart.map((i) => i.productId === productId ? { ...i, quantity } : i));
    };
    const increaseQuantity = (productId: string) => {
        const item = cart.find((i) => i.productId === productId);
        if (item) updateQuantity(productId, item.quantity + 1);
    };
    const decreaseQuantity = (productId: string) => {
        const item = cart.find((i) => i.productId === productId);
        if (item) updateQuantity(productId, item.quantity - 1);
    };
    const getQuantity = (productId: string) =>
        cart.find((i) => i.productId === productId)?.quantity ?? 0;
    const clearCart = () => setCart([]);
    const isInCart = (productId: string) =>
        cart.some((i) => i.productId === productId);
    return {
        cart, count,
        addItem, removeItem, updateQuantity,
        increaseQuantity, decreaseQuantity,
        getQuantity, clearCart, isInCart,
    };
};