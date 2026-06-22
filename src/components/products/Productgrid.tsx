import Link from "next/link";
import { Product } from "@/types/product";
import ProductCard from "./Productcard";
interface Props {
  products: Product[];
}
export default function ProductGrid({
  products,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="h-full">
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}