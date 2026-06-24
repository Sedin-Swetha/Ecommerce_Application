import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function HeroSection() {
    return (
        <section className="bg-primary text-white">
            <div className="container mx-auto px-4 py-10 md:py-14">
                <div className="mx-auto max-w-5xl text-center">
                    <p className="mb-2 text-sm font-medium">
                        🛍️ New Season Sale - Up to 50% Off
                    </p>
                    <h1 className="font-sans text-3xl font-bold leading-tight md:text-4xl">
                        Shop Smarter,Live Better
                    </h1>
                    <p className="mt-3 text-sm text-white/80 md:text-base">
                        Discover thousands of products at great prices.
                        Electronics, fashion, books, and home essentials
                        all in one place.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <Link
                            href={ROUTES.REGISTER}
                            className="rounded-md bg-white px-5 py-2.5 font-medium text-primary"
                        >
                            Start Shopping
                        </Link>
                        <Link
                            href={ROUTES.LOGIN}
                            className="rounded-md border border-white px-5 py-2.5 font-medium"
                        >
                            Sign In
                        </Link>
                    </div>
                    <div className="mt-8 flex justify-center gap-8">
                        <div>
                            <p className="text-lg font-bold">10K+</p>
                            <p className="text-xs text-white/80">Products</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">50K+</p>
                            <p className="text-xs text-white/80">Customers</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">4.8★</p>
                            <p className="text-xs text-white/80">Rating</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}