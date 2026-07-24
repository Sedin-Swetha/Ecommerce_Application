"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useAdminProducts } from "@/hooks/UseAdminProducts";
import { UserRole } from "@/types/enums";
import { AdminProductForm } from "@/types/admin";
import ProductGrid from "@/components/products/Productgrid";
import FilterSidebar from "@/components/products/Filter";
import SortDropdown from "@/components/products/Sort";
import ProductFormModal from "@/components/products/ProductFormModal";
import { filterProducts, sortProducts } from "@/services/ProductService";
function ProductsContent() {
  const searchParams = useSearchParams();
  const { user }     = useAuth();
  const { products, addProduct } = useAdminProducts();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true); }, []);
  const isAdminOrVendor = user?.role === UserRole.ADMIN || user?.role === UserRole.VENDOR;
  const search = searchParams.get("q") ?? "";
  const [category, setCategory]         = useState(() => searchParams.get("category") ?? "");
  const [brand, setBrand]               = useState("");
  const [priceRange, setPriceRange]     = useState("");
  const [discount, setDiscount]         = useState("");
  const [sortBy, setSortBy]             = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [hasScrolled, setHasScrolled]   = useState(false);
  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [addOpen, setAddOpen]           = useState(false);
  const [addLoading, setAddLoading]     = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const sourceProducts   = hasMounted ? products : [];
  const filteredProducts = filterProducts(sourceProducts, { search, category, brand, priceRange, discount });
  const sortedProducts   = sortProducts(filteredProducts, sortBy);
  const visibleProducts  = sortedProducts.slice(0, visibleCount);
  const hasMoreProducts  = visibleCount < sortedProducts.length;
  useEffect(() => { setVisibleCount(8); }, [search, category, brand, priceRange, discount, sortBy]);
  useEffect(() => {
    const onScroll = () => { if (!hasScrolled && window.scrollY > 0) setHasScrolled(true); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasScrolled]);

  useEffect(() => {
    if (!sentinelRef.current || !hasMoreProducts) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreProducts && hasScrolled)
          setVisibleCount((c) => Math.min(c + 8, sortedProducts.length));
      },
      { rootMargin: "0px 0px -120px 0px", threshold: 0.2 }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMoreProducts, sortedProducts.length, hasScrolled]);

  async function handleAddProduct(form: AdminProductForm) {
    setAddLoading(true);
    addProduct(form);
    setAddLoading(false);
    setAddOpen(false);
  }
  const activeFilterCount = [category, brand, priceRange, discount].filter(Boolean).length;
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Products</h1>
        {hasMounted && isAdminOrVendor && (
          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Product
          </button>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarVisible((v) => !v)}
            className="hidden lg:flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              className={`transition-transform duration-300 ${sidebarVisible ? "rotate-0" : "rotate-180"}`}>
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
          {hasMounted && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {sortedProducts.length}
              </span>{" "}products
            </p>
          )}
        </div>
        <SortDropdown sortBy={sortBy} onChange={setSortBy}/>
      </div>
      <div className="mt-4 flex gap-5">
        <aside className={`hidden lg:block flex-shrink-0 transition-all duration-300 ease-in-out relative ${sidebarVisible ? "w-56" : "w-14"}`}>
          <div className={`transition-opacity duration-300 w-56 ${sidebarVisible ? "opacity-100" : "opacity-0 pointer-events-none absolute top-0 left-0"}`}>
            <FilterSidebar
              category={category} setCategory={setCategory}
              brand={brand}       setBrand={setBrand}
              priceRange={priceRange} setPriceRange={setPriceRange}
              discount={discount} setDiscount={setDiscount}
            />
          </div>
          <div className={`transition-opacity duration-300 w-14 sticky top-24 flex flex-col items-center gap-6 rounded-xl border bg-white py-6 shadow-sm ${!sidebarVisible ? "opacity-100" : "opacity-0 pointer-events-none absolute top-0 left-0"}`}>
            <button onClick={() => setSidebarVisible(true)} className="text-gray-400 hover:text-primary transition" title="Category">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
            </button>
            <button onClick={() => setSidebarVisible(true)} className="text-gray-400 hover:text-primary transition" title="Brand">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
            </button>
            <button onClick={() => setSidebarVisible(true)} className="text-gray-400 hover:text-primary transition" title="Price">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </button>
            <button onClick={() => setSidebarVisible(true)} className="text-gray-400 hover:text-primary transition" title="Discount">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
              </svg>
            </button>
          </div>
        </aside>
        <div className="flex-1 min-w-0">
          {!hasMounted ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-gray-100 bg-white overflow-hidden">
                  <div className="aspect-[4/3] w-full animate-pulse bg-gray-100"/>
                  <div className="p-3 space-y-2">
                    <div className="h-3 w-1/3 animate-pulse rounded bg-gray-100"/>
                    <div className="h-4 w-full animate-pulse rounded bg-gray-100"/>
                    <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100"/>
                    <div className="h-8 w-full animate-pulse rounded bg-gray-100 mt-2"/>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ProductGrid products={visibleProducts} isAdmin={isAdminOrVendor}/>
          )}
          {hasMounted && (
            hasMoreProducts ? (
              <div ref={sentinelRef} className="mt-8 flex items-center justify-center py-8 text-sm text-gray-500 dark:text-gray-400">
                Loading more products...
              </div>
            ) : (
              <div className="mt-8 flex items-center justify-center py-8 text-sm text-gray-500 dark:text-gray-400">
                You've reached the end of the list.
              </div>
            )
          )}
        </div>
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)}/>
          <div className="absolute right-0 top-0 h-full w-[80%] max-w-xs overflow-y-auto bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">Filters</h2>
              <button onClick={() => setSidebarOpen(false)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200">✕</button>
            </div>
            <FilterSidebar
              category={category} setCategory={setCategory}
              brand={brand}       setBrand={setBrand}
              priceRange={priceRange} setPriceRange={setPriceRange}
              discount={discount} setDiscount={setDiscount}
            />
            <button onClick={() => setSidebarOpen(false)} className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white">
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
export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20 text-gray-400">Loading products...</div>}>
      <ProductsContent/>
    </Suspense>
  );
}