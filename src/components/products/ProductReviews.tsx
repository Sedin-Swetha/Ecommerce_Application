import { Review } from "@/types/product";
interface Props {
  reviews: Review[];
}
export default function ProductReviews({
  reviews,
}: Props) {
  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">
        Customer Reviews
      </h2>
      {reviews.length === 0 ? (
        <div
          className="
            rounded-lg
            border
            p-6
            text-center
            text-gray-500
          "
        >
          No reviews available.
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="
                rounded-xl
                border
                bg-white
                p-5
                shadow-sm
              "
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                  {review.userName}
                </h3>
                <span className="text-yellow-500">
                  ⭐ {review.rating}
                </span>
              </div>
              <p className="mt-3 text-gray-700">
                {review.comment}
              </p>
              <p className="mt-3 text-sm text-gray-400">
                {review.createdAt}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}