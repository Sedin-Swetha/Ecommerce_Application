import Link from "next/link";
import { ROUTES } from "@/constants/routes";
export default function HeroSection() {
  return (
    <section className="bg-primary text-white">
      <div className="border-b border-white/20 bg-primary/90 py-2 text-center text-xs font-medium tracking-wide">
        🛍️ New Season Sale - Up to 50% Off
      </div>
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="font-sans text-3xl font-bold leading-tight md:text-5xl">
            Shop Smarter, Live Better
          </h1>
          <p className="mt-4 text-sm text-white/80 md:text-base">
            Discover thousands of products at great prices. Electronics,
            fashion, books, and home essentials all in one place.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={ROUTES.REGISTER}
              className="rounded-md bg-white px-6 py-2.5 font-semibold text-primary transition hover:bg-white/90"
            >
              Start Shopping
            </Link>
            <Link
              href={ROUTES.LOGIN}
              className="rounded-md border border-white px-6 py-2.5 font-semibold transition hover:bg-white/10"
            >
              Sign In
            </Link>
          </div>
          <div className="mt-10 flex justify-center gap-10">
            <div>
              <p className="text-xl font-bold">10K+</p>
              <p className="text-xs text-white/70">Products</p>
            </div>
            <div>
              <p className="text-xl font-bold">50K+</p>
              <p className="text-xs text-white/70">Customers</p>
            </div>
            <div>
              <p className="text-xl font-bold">4.8★</p>
              <p className="text-xs text-white/70">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}