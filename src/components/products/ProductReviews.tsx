"use client";
import { useState } from "react";
import { useReviews } from "@/hooks/useReviews";
import { useAuth } from "@/hooks/useAuth";
import StarRating from "@/components/ui/StarRating";
import Button from "@/components/ui/Button";
export default function ProductReviews({ productId }: { productId: string }) {
  const { user } = useAuth();
  const { getReviewsByProduct, hasUserReviewed, addReview } = useReviews();
  const reviews = getReviewsByProduct(productId);
  const userHasReviewed = user ? hasUserReviewed(user.id, productId) : false;
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!comment.trim()) {
      setError("Please write a review comment.");
      return;
    }
    if (rating < 1 || rating > 5) {
      setError("Please select a rating between 1 and 5.");
      return;
    }
    setIsSubmitting(true);
    setError("");

    try {
      addReview(user.id, user.name, productId, rating, comment.trim());
      setComment("");
      setRating(5);
    } catch (err) {
      setError("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Customer Reviews</h2>
      {!user ? (
        <div className="mb-8 rounded-xl bg-gray-50 p-4 text-center text-gray-600">
          Please <a href="/login" className="font-semibold text-primary hover:underline">log in</a> to write a review.
        </div>
      ) : userHasReviewed ? (
        <div className="mb-8 rounded-xl bg-green-50 p-4 text-center text-green-700">
          Thank you! You have already reviewed this product.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-gray-100 bg-gray-50 p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Write a Review</h3>
          
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">Rating</label>
            <StarRating rating={rating} size={24} interactive onRate={setRating} />
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="mb-2 block text-sm font-medium text-gray-700">
              Your Review
            </label>
            <textarea
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="What did you like or dislike about this product?"
            />
          </div>

          {error && <p className="mb-4 text-sm font-medium text-red-500">{error}</p>}

          <Button type="submit" disabled={isSubmitting || !comment.trim()}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      )}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews yet. Be the first to review this product!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.userName}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <StarRating rating={review.rating} size={14} />
              </div>
              <p className="mt-3 text-sm text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
