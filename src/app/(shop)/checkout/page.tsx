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
import { Coupon } from "@/types/coupon";
import { couponsAtom } from "@/store/couponAtom";
const SHIPPING_THRESHOLD = 999;
export default function CheckoutPage() {
    const { user } = useAuth();
    const { cart, clearCart } = useCart();
    const { placeOrder } = useOrders();
    const products = useAtomValue(productsAtom);
    const coupons = useAtomValue(couponsAtom);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
    const [couponError, setCouponError] = useState("");
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
    
    const calculateEligibleSubtotal = (coupon: Coupon) => {
        if (coupon.vendorId) {
            return orderItems
                .filter(item => {
                    const p = products.find(prod => prod.id === item.productId);
                    return p?.vendorId === coupon.vendorId;
                })
                .reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0);
        } else if (coupon.categoryId) {
            return orderItems
                .filter(item => {
                    const p = products.find(prod => prod.id === item.productId);
                    return p?.categoryId === coupon.categoryId;
                })
                .reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0);
        }
        return subtotal;
    };

    let couponDiscountValue = 0;
    if (appliedCoupon) {
        const eligible = calculateEligibleSubtotal(appliedCoupon);
        // If cart changes making eligible 0, remove it silently (optional, but recalculation sets discount to 0)
        if (appliedCoupon.type === "percent") {
            couponDiscountValue = Math.floor((eligible * appliedCoupon.value) / 100);
        } else {
            couponDiscountValue = appliedCoupon.value;
        }
        if (couponDiscountValue > eligible) {
            couponDiscountValue = eligible;
        }
    }
    const total = subtotal - couponDiscountValue + shippingCharge;

    const handleApplyCoupon = (code: string) => {
        setCouponError("");
        const coupon = coupons.find(c => c.code === code);
        if (!coupon) {
            setCouponError("Invalid coupon code.");
            return;
        }
        
        const eligible = calculateEligibleSubtotal(coupon);
        if (eligible === 0) {
            setCouponError("Coupon is not applicable to any items in your cart.");
            return;
        }
        if (eligible < coupon.minOrderValue) {
            setCouponError(`Eligible items must total at least ₹${coupon.minOrderValue}.`);
            return;
        }
        if (coupon.type === "flat" && eligible < coupon.value) {
            setCouponError(`Eligible items must total at least ₹${coupon.value} to use this flat discount.`);
            return;
        }
        setAppliedCoupon(coupon);
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponError("");
    };

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
                couponCode: appliedCoupon?.code,
                couponDiscount: appliedCoupon ? couponDiscountValue : undefined,
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
                        appliedCouponCode={appliedCoupon?.code}
                        couponDiscountValue={couponDiscountValue}
                        onApplyCoupon={handleApplyCoupon}
                        onRemoveCoupon={handleRemoveCoupon}
                        couponError={couponError}
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