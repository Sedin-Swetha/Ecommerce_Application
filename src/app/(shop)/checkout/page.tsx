"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/UseOrders";
import { UserRole } from "@/types/enums";
import { productsAtom } from "@/store/ProductAtom";
import { OrderItem, ShippingAddress, PaymentMethod, } from "@/types/order";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import { Toast } from "@/components/ui/Toast";
const SHIPPING_THRESHOLD = 999;
export default function CheckoutPage() {
    const { user } = useAuth();
    const { cart, clearCart } = useCart();
    const { placeOrder } = useOrders();
    const products = useAtomValue(productsAtom);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    useEffect(() => {setMounted(true);}, []);
    useEffect(() => {
        if (!mounted) return;
        if (!user) {
            router.push("/login?redirect=/checkout");
            return;
        }
        if (user.role === UserRole.ADMIN) {
            router.push("/admin");
            return;
        }
    }, [mounted, user, router]);
    useEffect(() => {if (mounted && cart.length === 0 && !isOrderPlaced) {router.push("/cart");}}, [mounted, cart, router, isOrderPlaced]);
    if (!mounted) {
        return (<div className="flex items-center justify-center py-20">Loading...</div>);}
    if (!user || cart.length === 0 || user.role === "admin") {
        return null;
    }
    const orderItems: OrderItem[] = cart.flatMap((cartItem) => {
        const product = products.find(
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
            setIsOrderPlaced(true);
            setShowToast(true);
            setTimeout(() => {
                clearCart();
                router.push(`/orders/${orderId}`);
            }, 2000);
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
            <Toast 
                show={showToast} 
                message="Order placed successfully!" 
                type="success" 
                onDone={() => setShowToast(false)} 
            />
        </div>
    );
}