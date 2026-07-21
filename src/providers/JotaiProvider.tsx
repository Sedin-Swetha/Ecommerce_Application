"use client";
import { Provider, useSetAtom } from "jotai";
import { useEffect } from "react";
import { cartStorage } from "@/lib/storage/cart";
import { wishlistStorage } from "@/lib/storage/wishlist";
import { orderStorage } from "@/lib/storage/orders";
import { notificationStorage } from "@/lib/storage/notifications";
import { getProducts } from "@/lib/storage/products";
import { getCategories } from "@/lib/storage/categories";
import { cartAtom } from "@/store/cartAtom";
import { wishlistAtom } from "@/store/wishlistAtom";
import { ordersAtom } from "@/store/ordersAtom";
import { notificationsAtom } from "@/store/notificationsAtom";
import { reviewsStorage } from "@/lib/storage/reviews";
import { reviewsAtom } from "@/store/reviewsAtom";
import { productsAtom } from "@/store/ProductAtom";
import { categoriesAtom } from "@/store/CategoryAtom";
function StorageHydrator() {
  const setCart = useSetAtom(cartAtom);
  const setWishlist = useSetAtom(wishlistAtom);
  const setOrders = useSetAtom(ordersAtom);
  const setReviews = useSetAtom(reviewsAtom);
  const setNotifications = useSetAtom(notificationsAtom);
  const setProducts = useSetAtom(productsAtom);
  const setCategories = useSetAtom(categoriesAtom);
  useEffect(() => {
    const savedCart = cartStorage.get();
    const savedWishlist = wishlistStorage.get();
    const savedOrders = orderStorage.get();
    const savedReviews = reviewsStorage.get();
    const savedNotifications = notificationStorage.get();
    const savedProducts = getProducts();
    const savedCategories = getCategories();
    if (savedCart.length > 0) {
      setCart(savedCart);
    }
    if (savedWishlist.length > 0) {
      setWishlist(savedWishlist);
    }
    if (savedOrders.length > 0) {
      setOrders(savedOrders);
    }
    if (savedReviews.length > 0) {
      setReviews(savedReviews);
    }
    if (savedNotifications.length > 0) {
      setNotifications(savedNotifications);
    }
    if (savedProducts.length > 0) {
      setProducts(savedProducts);
    }
    if (savedCategories.length > 0) {
      setCategories(savedCategories);
    }
  }, [
    setCart,
    setWishlist,
    setOrders,
    setReviews,
    setNotifications,
    setProducts,
    setCategories,
  ]);
  return null;
}
export function JotaiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <StorageHydrator />
      {children}
    </Provider>
  );
}