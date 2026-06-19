import { defaultCategories } from "@/data/categories";
import Link from "next/link";
export default function CategoriesSection() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-2xl font-bold">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {defaultCategories.map((cat) => (
            <Link
              key={cat.id}
              href="/login"
              className="flex flex-col items-center rounded-lg border bg-white p-4 transition hover:shadow-md"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="mb-3 h-14 w-14 object-contain"
              />
              <span className="text-center text-sm font-medium">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}