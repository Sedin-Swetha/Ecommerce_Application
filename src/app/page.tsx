import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import CategoriesSection from "@/components/landing/CategoriesSection";
import CategoryProducts from "@/components/landing/CategoryProducts";
import HeroSection from "@/components/landing/HeroSection";
import OfferBanner from "@/components/landing/OfferBanner";
export default function LandingPage() {
    return (
        <main className="flex-1">
            <Navbar />
            <div className="text-center">
                <HeroSection />
                <div id="categories"><CategoriesSection /></div>
                <CategoryProducts />
                <OfferBanner />
            </div>
        </main>
    );
}