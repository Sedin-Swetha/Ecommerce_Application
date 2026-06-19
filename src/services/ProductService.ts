import { Product } from "@/types/product";
interface FilterOptions {
  search: string;
  category: string;
  brand: string;
  priceRange: string;
  discount: string;
}
export function filterProducts(
  products: Product[],
  filters: FilterOptions
): Product[] {
  const {
    search,
    category,
    brand,
    priceRange,
    discount,
  } = filters;
  return products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === "" ||
      product.categoryId === category;
    const matchesBrand =
      brand === "" ||
      product.brand === brand;
    let matchesPrice = true;
    if (priceRange === "0-1000") {
      matchesPrice = product.price < 1000;
    } else if (priceRange === "1000-5000") {
      matchesPrice =
        product.price >= 1000 &&
        product.price <= 5000;
    } else if (priceRange === "5000-20000") {
      matchesPrice =
        product.price >= 5000 &&
        product.price <= 20000;
    } else if (priceRange === "20000+") {
      matchesPrice = product.price > 20000;
    }
    const matchesDiscount =discount === "" ||product.discount >= Number(discount);
    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesPrice &&
      matchesDiscount
    );
  });
}
export function sortProducts(
  products: Product[],
  sortBy: string
): Product[] {
  const sortedProducts = [...products];
  switch (sortBy) {
    case "price-low-high":
      sortedProducts.sort(
        (a, b) => a.price - b.price
      );
      break;
    case "price-high-low":
      sortedProducts.sort(
        (a, b) => b.price - a.price
      );
      break;
    case "rating":
      sortedProducts.sort(
        (a, b) => b.rating - a.rating
      );
      break;
    case "discount":
      sortedProducts.sort(
        (a, b) => b.discount - a.discount
      );
      break;
    case "name":
      sortedProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;
  }
  return sortedProducts;
}
export function paginateProducts(
  products: Product[],
  currentPage: number,
  productsPerPage: number
): Product[] {
  const startIndex =
    (currentPage - 1) * productsPerPage;
  return products.slice(
    startIndex,
    startIndex + productsPerPage
  );
}