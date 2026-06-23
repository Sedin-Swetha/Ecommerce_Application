import { useAtom, useAtomValue } from "jotai";
import { wishlistAtomWithSync, wishlistCountAtom } from "@/store/wishlistAtom";
export function useWishlist() {
  const [wishlist, setWishlist] = useAtom(wishlistAtomWithSync);
  const count = useAtomValue(wishlistCountAtom);
  const addItem = (productId: string) => {
    if (!wishlist.includes(productId)) setWishlist([...wishlist, productId]);
  };
  const removeItem = (productId: string) =>
    setWishlist(wishlist.filter((id) => id !== productId));
  const toggleItem = (productId: string) =>
    wishlist.includes(productId) ? removeItem(productId) : addItem(productId);
  const isWishlisted = (productId: string) => wishlist.includes(productId);
  const clearWishlist = () => setWishlist([]);
  return { wishlist, count, addItem, removeItem, toggleItem, isWishlisted, clearWishlist };
}