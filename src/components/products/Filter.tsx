"use client";
import { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { categoriesAtom } from "@/store/CategoryAtom";
import { productsAtom } from "@/store/ProductAtom";
interface Props {
    category: string;
    setCategory: (value: string) => void;
    brand: string;
    setBrand: (value: string) => void;
    priceRange: string;
    setPriceRange: (value: string) => void;
    discount: string;
    setDiscount: (value: string) => void;
}

function FilterSection({
    title,
    children,
    defaultOpen = true,
}: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-gray-100 dark:border-gray-800 last:border-0 pb-5 last:pb-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between py-1 text-left font-semibold
                           text-gray-900 dark:text-gray-100 outline-none"
            >
                {title}
                <svg
                    width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5"
                    className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[400px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
                }`}
            >
                {children}
            </div>
        </div>
    );
}
const selectClass =
    "w-full rounded-xl border border-gray-200 dark:border-gray-700 " +
    "bg-white dark:bg-gray-900 " +
    "text-gray-900 dark:text-gray-100 " +
    "p-2.5 text-sm outline-none " +
    "focus:border-primary focus:ring-1 focus:ring-primary " +
    "transition-colors";
export default function FilterSidebar({
    category,
    setCategory,
    brand,
    setBrand,
    priceRange,
    setPriceRange,
    discount,
    setDiscount,
}: Props) {
    const [mounted, setMounted] = useState(false);
    const products = useAtomValue(productsAtom);
    const categories = useAtomValue(categoriesAtom);

    useEffect(() => {
        setMounted(true);
    }, []);

    const brands = mounted
        ? [...new Set(products.map((p) => p.brand.trim()))].sort((a, b) => a.localeCompare(b))
        : [];
    const visibleCategories = mounted ? categories : [];

    return (
        <div className="space-y-5 rounded-xl border border-gray-200 dark:border-gray-800
                        bg-white dark:bg-gray-900 p-5 shadow-sm lg:sticky lg:top-24">
            <FilterSection title="Category" defaultOpen={true}>
                <div className="flex flex-col gap-2.5">
                    <label className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                        <input
                            type="radio"
                            checked={category === ""}
                            onChange={() => setCategory("")}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-700"
                        />
                        All Categories
                    </label>
                    {mounted && visibleCategories.map((cat) => (
                        <label
                            key={cat.id}
                            className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                        >
                            <input
                                type="radio"
                                checked={category === cat.id}
                                onChange={() => setCategory(cat.id)}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-700"
                            />
                            {cat.name}
                        </label>
                    ))}
                </div>
            </FilterSection>
            <FilterSection title="Brand" defaultOpen={true}>
                <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className={selectClass}
                    disabled={!mounted}
                >
                    <option value="">All Brands</option>
                    {mounted && brands.map((b) => (
                        <option key={b} value={b}>{b}</option>
                    ))}
                </select>
            </FilterSection>
            <FilterSection title="Price" defaultOpen={true}>
                <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className={selectClass}
                >
                    <option value="">All Prices</option>
                    <option value="0-1000">Under ₹1,000</option>
                    <option value="1000-5000">₹1,000 – ₹5,000</option>
                    <option value="5000-20000">₹5,000 – ₹20,000</option>
                    <option value="20000+">Above ₹20,000</option>
                </select>
            </FilterSection>
            <FilterSection title="Discount" defaultOpen={false}>
                <select
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className={selectClass}
                >
                    <option value="">All Discounts</option>
                    <option value="10">10% &amp; Above</option>
                    <option value="20">20% &amp; Above</option>
                    <option value="30">30% &amp; Above</option>
                </select>
            </FilterSection>

        </div>
    );
}