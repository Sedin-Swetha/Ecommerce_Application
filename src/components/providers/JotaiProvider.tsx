"use client";
import { Provider, useSetAtom } from "jotai";
import { useEffect } from "react";
import { cartStorage } from "@/lib/storage/cart";
import { wishlistStorage } from "@/lib/storage/wishlist";
import { orderStorage } from "@/lib/storage/orders";
import { cartAtom } from "@/store/cartAtom";
import { wishlistAtom } from "@/store/wishlistAtom";
import { ordersAtom } from "@/store/ordersAtom";
function StorageHydrator() {
  const setCart = useSetAtom(cartAtom);
  const setWishlist = useSetAtom(wishlistAtom);
  const setOrders = useSetAtom(ordersAtom);
  useEffect(() => {
    const savedCart = cartStorage.get();
    const savedWishlist = wishlistStorage.get();
    const savedOrders = orderStorage.get();
    if (savedCart.length > 0) {
      setCart(savedCart);
    }
    if (savedWishlist.length > 0) {
      setWishlist(savedWishlist);
    }
    if (savedOrders.length > 0) {
      setOrders(savedOrders);
    }
  }, [setCart, setWishlist, setOrders]);
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