"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/UseOrders";
import { defaultProducts } from "@/data/products";
import { OrderItem, ShippingAddress, PaymentMethod, } from "@/types/order";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
const SHIPPING_THRESHOLD = 999;
export default function CheckoutPage() {
    const { user } = useAuth();
    const { cart, clearCart } = useCart();
    const { placeOrder } = useOrders();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {setMounted(true);}, []);
    useEffect(() => {if (mounted && !user) {router.push("/login");} }, [mounted, user, router]);
    useEffect(() => {if (mounted && cart.length === 0) {router.push("/cart");}}, [mounted, cart, router]);
    if (!mounted) {
        return (<div className="flex items-center justify-center py-20">Loading...</div>);}
    if (!user || cart.length === 0) {
        return null;
    }
    const orderItems: OrderItem[] = cart.flatMap((cartItem) => {
        const product = defaultProducts.find(
            (p) => p.id === cartItem.productId
        );
        if (!product) return [];
        const discountedPrice = Math.round(
            product.price -
            (product.price * product.discount) / 100
        );
        return [
            {
                productId: product.id,
                name: product.name,
                brand: product.brand,
                image: product.images[0],
                price: product.price,
                discountedPrice,
                quantity: cartItem.quantity,
            },
        ];
    });
    const subtotal = orderItems.reduce(
        (sum, item) =>
            sum + item.discountedPrice * item.quantity,
        0
    );
    const shippingCharge =subtotal >= SHIPPING_THRESHOLD ? 0 : 99;
    const total = subtotal + shippingCharge;
    const handlePlaceOrder = async (
        address: ShippingAddress,
        payment: PaymentMethod) => {
        try {
            setIsLoading(true);
            await new Promise((resolve) =>
                setTimeout(resolve, 800)
            );
            const order = placeOrder({
                userId: user.id,
                items: orderItems,
                shippingAddress: address,
                paymentMethod: payment,
                subtotal,
                shippingCharge,
                total,
            });
            if (!order || !order.id) {
                throw new Error("Order creation failed");
            }
            const orderId = order.id;
            clearCart();
            setTimeout(() => {
                router.push(`/orders/${orderId}`);
            }, 100);
        } catch (error) {
            console.error("Checkout error:", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="mx-auto max-w-5xl px-4 py-10">
            <h1 className="mb-8 text-2xl font-bold text-gray-900">
                Checkout
            </h1>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
                <CheckoutForm
                    onSubmit={handlePlaceOrder}
                    isLoading={isLoading}
                />
                <div className="h-fit lg:sticky lg:top-20">
                    <CheckoutSummary
                        items={orderItems}
                        subtotal={subtotal}
                        shippingCharge={shippingCharge}
                        total={total}
                    />
                </div>
            </div>
        </div>
    );
}