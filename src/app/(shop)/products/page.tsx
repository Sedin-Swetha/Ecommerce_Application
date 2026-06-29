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
  const [showFilters, setShowFilters] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const productsPerPage = 8;
  const sourceProducts = isAdmin ? products : defaultProducts;
  const filteredProducts = filterProducts(sourceProducts, {
    search, category, brand, priceRange, discount,
  });
  const sortedProducts = sortProducts(filteredProducts, sortBy);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = paginateProducts(sortedProducts, currentPage, productsPerPage);
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, brand, priceRange, discount, sortBy]);
  async function handleAddProduct(form: AdminProductForm) {
    setAddLoading(true);
    addProduct(form);
    setAddLoading(false);
    setAddOpen(false);
  }
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {isAdmin ? "Manage Products" : "Products"}
        </h1>
        {isAdmin && (
          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Product
          </button>
        )}
      </div>
      <SearchBar value={search} onChange={setSearch} />
      <button
        onClick={() => setShowFilters(true)}
        className="mt-4 w-full rounded-lg bg-primary py-3 font-medium text-white lg:hidden"
      >
        Filters
      </button>
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-[85%] overflow-y-auto bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="text-2xl">✕</button>
            </div>
            <FilterSidebar
              category={category} setCategory={setCategory}
              brand={brand} setBrand={setBrand}
              priceRange={priceRange} setPriceRange={setPriceRange}
              discount={discount} setDiscount={setDiscount}
            />
          </div>
        </div>
      )}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
        <aside className="hidden lg:block">
          <FilterSidebar
            category={category} setCategory={setCategory}
            brand={brand} setBrand={setBrand}
            priceRange={priceRange} setPriceRange={setPriceRange}
            discount={discount} setDiscount={setDiscount}
          />
        </aside>
        <main className="lg:col-span-3">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              {sortedProducts.length} Products Found
            </p>
            <SortDropdown sortBy={sortBy} onChange={setSortBy} />
          </div>
          <ProductGrid products={paginatedProducts} isAdmin={isAdmin} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
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