import { Product } from "@/types/product";

export const defaultProducts: Product[] = [
  // ═══════════════════════════════════════════════════════
  // CAT001 — Electronics
  // ═══════════════════════════════════════════════════════
  {
    id: "PRD081",
    name: "OnePlus 13",
    description: "Flagship smartphone with Snapdragon processor and AMOLED display.",
    categoryId: "CAT001",
    brand: "OnePlus",
    price: 69999,
    discount: 8,
    stock: 25,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"
    ],
    isFeatured: true,
    createdAt: "2025-03-22T00:00:00.000Z",
  },
  {
    id: "PRD082",
    name: "HP Pavilion 15 Laptop",
    description: "15.6-inch laptop with Intel Core i7 processor and SSD storage.",
    categoryId: "CAT001",
    brand: "HP",
    price: 74999,
    discount: 12,
    stock: 18,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1496181130204-755241524eab?w=600&h=600&fit=crop"
    ],
    isFeatured: false,
    createdAt: "2025-03-23T00:00:00.000Z",
  },
  // ═══════════════════════════════════════════════════════
  // CAT002 — Fashion / Apparel
  // ═══════════════════════════════════════════════════════
  {
    id: "PRD083",
    name: "Men's Casual Sneakers",
    description: "Comfortable everyday sneakers with lightweight cushioning.",
    categoryId: "CAT002",
    brand: "Adidas",
    price: 3999,
    discount: 18,
    stock: 60,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"
    ],
    isFeatured: true,
    createdAt: "2025-03-24T00:00:00.000Z",
  },
  {
    id: "PRD084",
    name: "Women's Cotton Saree",
    description: "Elegant soft cotton saree suitable for casual and festive wear.",
    categoryId: "CAT002",
    brand: "Biba",
    price: 2499,
    discount: 20,
    stock: 75,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop"
    ],
    isFeatured: false,
    createdAt: "2025-03-25T00:00:00.000Z",
  },
  // ═══════════════════════════════════════════════════════
  // CAT003 — Grocery / Food
  // ═══════════════════════════════════════════════════════
  {
    id: "PRD085",
    name: "Britannia Good Day Biscuits",
    description: "Crunchy butter cookies perfect for tea-time snacks.",
    categoryId: "CAT003",
    brand: "Britannia",
    price: 45,
    discount: 5,
    stock: 300,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1558961312-50346c0998d5?w=600&h=600&fit=crop"
    ],
    isFeatured: false,
    createdAt: "2025-03-26T00:00:00.000Z",
  },
  // ═══════════════════════════════════════════════════════
  // CAT004 — Furniture
  // ═══════════════════════════════════════════════════════
  {
    id: "PRD086",
    name: "Coffee Table",
    description: "Modern wooden coffee table for living rooms.",
    categoryId: "CAT004",
    brand: "Home Centre",
    price: 5999,
    discount: 15,
    stock: 22,
    rating: 4.4,
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&h=600&fit=crop"
    ],
    isFeatured: false,
    createdAt: "2025-03-27T00:00:00.000Z",
  },
  // ═══════════════════════════════════════════════════════
  // CAT005 — Home & Kitchen
  // ═══════════════════════════════════════════════════════
  {
    id: "PRD087",
    name: "Stainless Steel Water Bottle",
    description: "1L insulated bottle keeps drinks hot and cold for hours.",
    categoryId: "CAT005",
    brand: "Milton",
    price: 899,
    discount: 10,
    stock: 90,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop"
    ],
    isFeatured: true,
    createdAt: "2025-03-28T00:00:00.000Z",
  },
  {
    id: "PRD088",
    name: "Rice Cooker 1.8L",
    description: "Automatic electric rice cooker with keep-warm function.",
    categoryId: "CAT005",
    brand: "Prestige",
    price: 2999,
    discount: 18,
    stock: 28,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&h=600&fit=crop"
    ],
    isFeatured: false,
    createdAt: "2025-03-29T00:00:00.000Z",
  },
  // ═══════════════════════════════════════════════════════
  // CAT006 — Beauty & Grooming
  // ═══════════════════════════════════════════════════════
  {
    id: "PRD089",
    name: "Vitamin E Moisturizer",
    description: "Daily moisturizing cream enriched with Vitamin E.",
    categoryId: "CAT006",
    brand: "The Body Shop",
    price: 899,
    discount: 12,
    stock: 65,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1608248597481-496100c8c836?w=600&h=600&fit=crop"
    ],
    isFeatured: true,
    createdAt: "2025-03-30T00:00:00.000Z",
  },
  {
    id: "PRD090",
    name: "Beard Grooming Kit",
    description: "Complete beard care kit with oil, balm, comb, and scissors.",
    categoryId: "CAT006",
    brand: "Beardo",
    price: 1299,
    discount: 15,
    stock: 50,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&h=600&fit=crop"
    ],
    isFeatured: false,
    createdAt: "2025-03-31T00:00:00.000Z",
  }
];