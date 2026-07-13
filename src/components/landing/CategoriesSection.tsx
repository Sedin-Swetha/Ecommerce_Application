"use client";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { categoriesAtom } from "@/store/CategoryAtom";
export default function CategoriesSection() {
  const categories = useAtomValue(categoriesAtom);
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-2xl font-bold">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className="flex flex-col items-center rounded-lg border border-gray-200 dark:border-gray-800
                         bg-white dark:bg-gray-900 p-4 transition hover:shadow-md hover:border-primary/20"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="mb-3 h-14 w-14 object-contain"
              />
              <span className="text-center text-sm font-medium text-gray-800 dark:text-gray-100">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}