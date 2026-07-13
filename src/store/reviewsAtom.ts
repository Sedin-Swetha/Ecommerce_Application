import { atom } from "jotai";
import { Review } from "@/types/product";
import { reviewsStorage } from "@/lib/storage/reviews";
export const reviewsAtom = atom<Review[]>([]);
export const reviewsAtomWithSync = atom(
  (get) => get(reviewsAtom),
  (_get, set, newReviews: Review[]) => {
    set(reviewsAtom, newReviews);
    reviewsStorage.set(newReviews);
  }
);
