import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import CategoriesSection from "@/components/landing/CategoriesSection";
export default function LandingPage() {
    return (
        <main className="flex-1">
            <Navbar />
            <div className="text-center">
                {/* <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                    E-Commerce Store
                </h1>
                <p className="mt-4 text-sm text-gray-600 sm:text-base">
                    Shop
                </p> */}
                <div id="categories"><CategoriesSection/></div>
            </div>
        </main>
    );
}