"use client";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
interface Props {
  product: Product;
  relatedProducts: Product[];
}
export default function ProductDetails({
  product,
  relatedProducts,
}: Props) {
  const { addItem, isInCart } = useCart();
  const discountedPrice =
    product.price -
    (product.price * product.discount) / 100;
     const inCart = isInCart(product.id);
  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-[500px] w-full rounded-xl border object-cover"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>
          <p className="mt-3 text-gray-500">
            Brand: {product.brand}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <span className="text-4xl font-bold text-green-600">
              ₹{Math.round(
                discountedPrice
              )}
            </span>
            {product.discount > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.price}
                </span>
                <span className="rounded bg-red-100 px-3 py-1 text-sm text-red-600">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>
          <p className="mt-4 text-lg text-yellow-500">
            ⭐ {product.rating}
          </p>
          <p className="mt-3">
            Stock Available:
            <span className="ml-2 font-semibold">
              {product.stock}
            </span>
          </p>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">
              Description
            </h2>
            <p className="mt-3 leading-relaxed text-gray-700">
              {product.description}
            </p>
          </div>
          <div className="mt-8 flex gap-4">
            <button
              onClick={() =>
                addItem(product.id)
              }
              disabled={product.stock === 0}
              className={`
                rounded-xl
                px-8
                py-3
                font-medium
                text-white
                transition
                ${
                  product.stock === 0
                    ? "cursor-not-allowed bg-gray-400"
                    : inCart
                    ? "bg-green-600"
                    : "bg-blue-600 hover:bg-blue-700"
                }
              `}
            >
              {product.stock === 0
                ? "Out Of Stock"
                : inCart
                ? "✓ Added To Cart"
                : "Add To Cart"}
            </button>
            <button
              className="
                rounded-xl
                border
                border-gray-300
                px-8
                py-3
                font-medium
                hover:bg-gray-50
              "
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="mb-6 text-2xl font-bold">
          Related Products
        </h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {relatedProducts.map(
            (related) => (
              <Link
                key={related.id}
                href={`/products/${related.id}`}
              >
                <div
                  className="
                    rounded-xl
                    border
                    bg-white
                    p-4
                    shadow-sm
                    transition
                    hover:shadow-lg
                  "
                >
                  <img
                    src={related.images[0]}
                    alt={related.name}
                    className="h-44 w-full rounded-lg object-cover"
                  />

                  <h3 className="mt-3 font-semibold">
                    {related.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {related.brand}
                  </p>
                  <p className="mt-2 font-bold text-green-600">
                    ₹{related.price}
                  </p>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}