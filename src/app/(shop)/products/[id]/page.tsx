"use client";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { defaultProducts } from "@/data/products";
import { Product } from "@/types/product";
import { STORAGE_KEYS } from "@/constants/StorageKeys";
import ProductDetailClient from "@/components/products/ProductDetailClient";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [product, setProduct] = useState<Product | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;

    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    const savedProducts: Product[] = raw ? JSON.parse(raw) : [];
    const allProducts = [
      ...defaultProducts.filter((p) => !savedProducts.some((saved) => saved.id === p.id)),
      ...savedProducts,
    ];

    const found = allProducts.find((p) => p.id === id);
    setProduct(found ?? null);
  }, [id]);

  if (!id) {
    notFound();
  }

  if (product === undefined) {
    return (
      <div className="flex items-center justify-center py-40">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (product === null) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
