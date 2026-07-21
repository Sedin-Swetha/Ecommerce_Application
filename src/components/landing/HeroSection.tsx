"use client";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useAtomValue } from "jotai";
import { isAuthenticatedAtom } from "@/store/userAtom";
import { useState, useEffect } from "react";
export default function HeroSection() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <section className="overflow-hidden bg-primary text-white pt-16 sm:pt-0 dark:bg-slate-950 dark:text-white">
      <div className="border-b border-white/20 bg-primary/90 px-4 py-2 text-center text-[11px] font-medium tracking-wide sm:text-xs dark:border-white/10 dark:bg-slate-900/80">
        🛍️ New Season Sale - Up to 50% Off
      </div>
      <div className="container mx-auto px-4 py-10 sm:py-12 md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="font-sans text-2xl font-bold leading-tight sm:text-3xl md:text-5xl">
            Shop Smarter, Live Better
          </h1>
          <p className="mt-4 text-sm text-white/80 md:text-base px-2 sm:px-0 dark:text-white/70">
            Discover thousands of products at great prices. Electronics,
            fashion, books, and home essentials all in one place.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            {mounted ? (
              isAuthenticated ? (
                <Link
                  href="/products"
                  className="rounded-md bg-white px-6 py-2.5 text-center font-semibold text-primary transition hover:bg-white/90 dark:border-white/20 dark:hover:bg-white/10"
                >
                  Continue Shopping
                </Link>
              ) : (
                <>
                  <Link
                    href={ROUTES.REGISTER}
                    className="rounded-md bg-white px-6 py-2.5 text-center font-semibold text-primary transition hover:bg-white/90 dark:border-white/20 dark:hover:bg-white/10"
                  >
                    Start Shopping
                  </Link>
                  <Link
                    href={ROUTES.LOGIN}
                    className="rounded-md border border-white px-6 py-2.5 text-center font-semibold transition hover:bg-white/10 dark:border-white/20 dark:hover:bg-white/10"
                  >
                    Sign In
                  </Link>
                </>
              )
            ) : (
              <div className="h-10"></div>
            )}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-4 sm:gap-x-10">
            <div>
              <p className="text-lg font-bold sm:text-xl">10K+</p>
              <p className="text-xs text-white/70 dark:text-white/60">Products</p>
            </div>
            <div>
              <p className="text-lg font-bold sm:text-xl">50K+</p>
              <p className="text-xs text-white/70 dark:text-white/60">Customers</p>
            </div>
            <div>
              <p className="text-lg font-bold sm:text-xl">4.8★</p>
              <p className="text-xs text-white/70 dark:text-white/60">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}