"use client";
import { useState, useEffect } from "react";
import { defaultProducts } from "@/data/products";
import ProductGrid from "@/components/products/Productgrid";
import SearchBar from "@/components/products/SearchBar";
import FilterSidebar from "@/components/products/Filter";
import Pagination from "@/components/products/Pagination";
import SortDropdown from "@/components/products/Sort";
import {filterProducts,sortProducts,paginateProducts,} from "@/services/ProductService";
export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [discount, setDiscount] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] =useState(1);
  const [showFilters, setShowFilters] =useState(false);
  const productsPerPage = 8;
  const filteredProducts =
    filterProducts(defaultProducts, {
      search,
      category,
      brand,
      priceRange,
      discount,
    });
  const sortedProducts =
    sortProducts(
      filteredProducts,
      sortBy
    );
  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    category,
    brand,
    priceRange,
    discount,
    sortBy,
  ]);
  const totalPages = Math.ceil(
    sortedProducts.length /
      productsPerPage
  );
  const paginatedProducts =
    paginateProducts(
      sortedProducts,
      currentPage,
      productsPerPage
    );
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">
        Products
      </h1>
      <SearchBar
        value={search}
        onChange={setSearch}
      />
      <button
        onClick={() =>
          setShowFilters(true)
        }
        className="
          mt-4
          w-full
          rounded-lg
          bg-blue-600
          py-3
          font-medium
          text-white
          lg:hidden
        "
      >
        Filters
      </button>
      {showFilters && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/50
            lg:hidden
          "
        >
          <div
            className="
              absolute
              right-0
              top-0
              h-full
              w-[85%]
              overflow-y-auto
              bg-white
              p-4
            "
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Filters
              </h2>
              <button
                onClick={() =>
                  setShowFilters(false)
                }
                className="text-2xl"
              >
                ✕
              </button>
            </div>
            <FilterSidebar
              category={category}
              setCategory={setCategory}
              brand={brand}
              setBrand={setBrand}
              priceRange={priceRange}
              setPriceRange={
                setPriceRange
              }
              discount={discount}
              setDiscount={
                setDiscount
              }
            />
          </div>
        </div>
      )}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
        <aside className="hidden lg:block">
          <FilterSidebar
            category={category}
            setCategory={setCategory}
            brand={brand}
            setBrand={setBrand}
            priceRange={priceRange}
            setPriceRange={
              setPriceRange
            }
            discount={discount}
            setDiscount={
              setDiscount
            }
          />
        </aside>
        <main className="lg:col-span-3">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              {sortedProducts.length} Products Found
            </p>
            <SortDropdown
              sortBy={sortBy}
              onChange={setSortBy}
            />
          </div>
          <ProductGrid
            products={
              paginatedProducts
            }
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={
              setCurrentPage
            }
          />
        </main>
      </div>
    </div>
  );
}