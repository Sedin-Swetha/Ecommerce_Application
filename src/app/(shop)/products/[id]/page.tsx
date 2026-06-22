import ProductDetails from "@/components/products/ProductDetails";
import ProductReviews from "@/components/products/ProductReviews";
import { defaultProducts } from "@/data/products";
import { defaultReviews } from "@/data/reviews";
interface Props {
  params: Promise<{
    id: string;
  }>;
}
export default async function ProductPage({
  params,
}: Props) {
  const { id } = await params;
  const product = defaultProducts.find(
    (p) => p.id === id
  );
  if (!product) {
    return <div>Product Not Found</div>;
  }
  const relatedProducts = defaultProducts
    .filter(
      (p) =>
        p.categoryId === product.categoryId &&
        p.id !== product.id
    )
    .slice(0, 4);
  const reviews = defaultReviews.filter(
    (review) =>
      review.productId === product.id
  );
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <ProductDetails
        product={product}
        relatedProducts={relatedProducts}
      />
      <ProductReviews reviews={reviews} />
    </div>
  );
}