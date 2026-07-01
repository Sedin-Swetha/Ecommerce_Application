"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { defaultProducts } from "@/data/products";
import { useAuth } from "@/hooks/useAuth";
import { useAdminProducts } from "@/hooks/UseAdminProducts";
import { UserRole } from "@/types/enums";
import { AdminProductForm } from "@/types/admin";
import ProductGrid from "@/components/products/Productgrid";
import SearchBar from "@/components/products/SearchBar";
import FilterSidebar from "@/components/products/Filter";
import Pagination from "@/components/products/Pagination";
import SortDropdown from "@/components/products/Sort";
import ProductFormModal from "@/components/products/ProductFormModal";
import { filterProducts, sortProducts, paginateProducts } from "@/services/ProductService";

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const { user } = useAuth();
    const { products, addProduct } = useAdminProducts();
    const isAdmin = user?.role === UserRole.ADMIN;

    const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
    const [category, setCategory] = useState(() => searchParams.get("category") ?? "");
    const [brand, setBrand] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [discount, setDiscount] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // ✅ CHANGE: default true so filters are visible on load
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    const [addLoading, setAddLoading] = useState(false);

    const productsPerPage = 12;
    const sourceProducts = isAdmin ? products : defaultProducts;
    const filteredProducts = filterProducts(sourceProducts, { search, category, brand, priceRange, discount });
    const sortedProducts = sortProducts(filteredProducts, sortBy);
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const paginatedProducts = paginateProducts(sortedProducts, currentPage, productsPerPage);

    useEffect(() => { setCurrentPage(1); }, [search, category, brand, priceRange, discount, sortBy]);

    async function handleAddProduct(form: AdminProductForm) {
        setAddLoading(true);
        addProduct(form);
        setAddLoading(false);
        setAddOpen(false);
    }

    const activeFilterCount = [category, brand, priceRange, discount].filter(Boolean).length;

    return (
        <div className="mx-auto max-w-7xl px-4 py-6">

            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                {isAdmin && (
                    <button
                        onClick={() => setAddOpen(true)}
                        className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add Product
                    </button>
                )}
            </div>

            {/* Search */}
            <SearchBar value={search} onChange={setSearch} />

            {/* Toolbar */}
            <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">

                    {/* ✅ CHANGE: Desktop collapse toggle — now shows chevron arrow instead of text */}
                    <button
                        onClick={() => setSidebarVisible((v) => !v)}
                        className="hidden lg:flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                        title={sidebarVisible ? "Collapse filters" : "Expand filters"}
                    >
                        {/* Filter icon */}
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                        </svg>
                        Filters
                        {/* Active filter count badge */}
                        {activeFilterCount > 0 && (
                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                                {activeFilterCount}
                            </span>
                        )}
                        {/* ✅ CHANGE: Animated chevron showing open/closed state */}
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className={`transition-transform duration-300 ${sidebarVisible ? "rotate-0" : "rotate-180"}`}
                        >
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    {/* Mobile filter button (unchanged) */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                        </svg>
                        Filters
                        {activeFilterCount > 0 && (
                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                                {activeFilterCount}
                            </span>
                        )}
                    </button>

                    <p className="text-sm text-gray-500">
                        <span className="font-semibold text-gray-800">{sortedProducts.length}</span> products
                    </p>
                </div>
                <SortDropdown sortBy={sortBy} onChange={setSortBy} />
            </div>

            {/* ✅ CHANGE: Main layout — sidebar animates in/out with CSS transition */}
            <div className="mt-4 flex gap-5">

                {/*
                  ✅ CHANGE: Instead of {sidebarVisible && <aside>} which causes abrupt jump,
                  we use overflow-hidden + grid-cols transition for a smooth collapse.
                  The sidebar width animates from w-56 to w-0 with opacity fade.
                */}
                <aside
                    className={`hidden lg:block flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out ${
                        sidebarVisible ? "w-56 opacity-100" : "w-0 opacity-0"
                    }`}
                >
                    {/* Inner div keeps the content width fixed while the outer animates */}
                    <div className="w-56">
                        <FilterSidebar
                            category={category} setCategory={setCategory}
                            brand={brand} setBrand={setBrand}
                            priceRange={priceRange} setPriceRange={setPriceRange}
                            discount={discount} setDiscount={setDiscount}
                        />
                    </div>
                </aside>

                {/* Product grid — naturally fills remaining space */}
                <div className="flex-1 min-w-0">
                    <ProductGrid products={paginatedProducts} isAdmin={isAdmin} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            {/* Mobile drawer (unchanged) */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div className="absolute right-0 top-0 h-full w-[80%] max-w-xs overflow-y-auto bg-white p-5 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-base font-bold text-gray-900">Filters</h2>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200"
                            >
                                ✕
                            </button>
                        </div>
                        <FilterSidebar
                            category={category} setCategory={setCategory}
                            brand={brand} setBrand={setBrand}
                            priceRange={priceRange} setPriceRange={setPriceRange}
                            discount={discount} setDiscount={setDiscount}
                        />
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}

            <ProductFormModal
                open={addOpen}
                onClose={() => setAddOpen(false)}
                onSubmit={handleAddProduct}
                mode="add"
                loading={addLoading}
            />
        </div>
    );
}