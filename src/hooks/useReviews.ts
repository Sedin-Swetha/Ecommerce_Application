import { useAtom } from "jotai";
import { reviewsAtomWithSync } from "@/store/reviewsAtom";
import { Review } from "@/types/product";
import { productsAtom } from "@/store/ProductAtom";
import { updateProduct as storageUpdateProduct } from "@/lib/storage/products";
export function useReviews() {
  const [reviews, setReviews] = useAtom(reviewsAtomWithSync);
  const [products, setProducts] = useAtom(productsAtom);
  const getReviewsByProduct = (productId: string): Review[] => {
    return reviews
      .filter((r) => r.productId === productId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };
  const hasUserReviewed = (userId: string, productId: string): boolean => {
    return reviews.some((r) => r.userId === userId && r.productId === productId);
  };
  const addReview = (
    userId: string,
    userName: string,
    productId: string,
    rating: number,
    comment: string
  ): Review => {
    const newReview: Review = {
      id: `REV-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      userId,
      userName,
      productId,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };
    const newReviews = [newReview, ...reviews];
    setReviews(newReviews);
    const productReviews = newReviews.filter((r) => r.productId === productId);
    const totalRating = productReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / productReviews.length;
    const roundedRating = Math.round(averageRating * 10) / 10;
    const updatedProduct = storageUpdateProduct(productId, { rating: roundedRating });
    if (updatedProduct) {
      setProducts((prev) => prev.map((p) => (p.id === productId ? updatedProduct : p)));
    }
    return newReview;
  };
  return { reviews, getReviewsByProduct, hasUserReviewed, addReview };
}
