import { Product } from "@/types/product";

export const defaultProducts: Product[] = [
  {
    id: "PRD001", name: "iPhone 15 Pro", description: "Apple's latest flagship with A17 Pro chip, titanium design, and pro camera system.", categoryId: "CAT001", brand: "Apple", price: 134900, discount: 5, stock: 20, rating: 4.8, images: ["https://picsum.photos/seed/iphone15/600/600"], isFeatured: true, createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "PRD002", name: "Samsung Galaxy S24 Ultra", description: "Flagship Android phone with built-in S Pen and 200MP camera.", categoryId: "CAT001", brand: "Samsung", price: 129999, discount: 10, stock: 15, rating: 4.7, images: ["https://picsum.photos/seed/galaxys24/600/600"], isFeatured: true, createdAt: "2025-01-02T00:00:00.000Z",
  },
  {
    id: "PRD003", name: "Sony WH-1000XM5", description: "Industry-leading noise cancelling headphones with 30-hour battery.", categoryId: "CAT001", brand: "Sony", price: 29990, discount: 15, stock: 30, rating: 4.9, images: ["https://picsum.photos/seed/sonyxm5/600/600"], isFeatured: true, createdAt: "2025-01-03T00:00:00.000Z",
  },
  {
    id: "PRD004", name: "MacBook Air M3", description: "Ultra-thin laptop powered by Apple M3 chip with 18-hour battery life.", categoryId: "CAT001", brand: "Apple", price: 114900, discount: 0, stock: 12, rating: 4.9, images: ["https://picsum.photos/seed/macbookm3/600/600"], isFeatured: true, createdAt: "2025-01-04T00:00:00.000Z",
  },
  {
    id: "PRD005", name: "Men's Classic Polo T-Shirt", description: "100% cotton premium polo shirt, perfect for casual and semi-formal occasions.", categoryId: "CAT002", brand: "H&M", price: 999, discount: 20, stock: 100, rating: 4.3, images: ["https://picsum.photos/seed/poloshirt/600/600"], isFeatured: false, createdAt: "2025-01-05T00:00:00.000Z",
  },
  {
    id: "PRD006", name: "Women's Floral Kurti", description: "Elegant floral print kurti in soft rayon fabric.", categoryId: "CAT002", brand: "FabIndia", price: 1299, discount: 25, stock: 80, rating: 4.5, images: ["https://picsum.photos/seed/kurti/600/600"], isFeatured: false, createdAt: "2025-01-06T00:00:00.000Z",
  },
  {
    id: "PRD007", name: "Atomic Habits", description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones by James Clear.", categoryId: "CAT003", brand: "Penguin", price: 399, discount: 30, stock: 200, rating: 4.8, images: ["https://picsum.photos/seed/atomichabits/600/600"], isFeatured: true, createdAt: "2025-01-07T00:00:00.000Z",
  },
  {
    id: "PRD008", name: "The Alchemist", description: "Paulo Coelho's masterpiece about following your dreams.", categoryId: "CAT003", brand: "HarperCollins", price: 299, discount: 20, stock: 150, rating: 4.7, images: ["https://picsum.photos/seed/alchemist/600/600"], isFeatured: false, createdAt: "2025-01-08T00:00:00.000Z",
  },
  {
    id: "PRD009", name: "Instant Pot Duo 7-in-1", description: "7-in-1 electric pressure cooker that replaces 7 kitchen appliances.", categoryId: "CAT004", brand: "Instant Pot", price: 8999, discount: 12, stock: 40, rating: 4.6, images: ["https://picsum.photos/seed/instantpot/600/600"], isFeatured: false, createdAt: "2025-01-09T00:00:00.000Z",
  },
  {
    id: "PRD010", name: "Philips Air Fryer", description: "Rapid Air technology for healthy cooking with 80% less fat.", categoryId: "CAT004", brand: "Philips", price: 7499, discount: 18, stock: 25, rating: 4.5, images: ["https://picsum.photos/seed/airfryer/600/600"], isFeatured: true, createdAt: "2025-01-10T00:00:00.000Z",
  },
  {
    id: "PRD011", name: "Yoga Mat Premium", description: "6mm thick non-slip yoga mat with alignment lines. Eco-friendly TPE material.", categoryId: "CAT005", brand: "Boldfit", price: 799, discount: 10, stock: 60, rating: 4.4, images: ["https://picsum.photos/seed/yogamat/600/600"], isFeatured: false, createdAt: "2025-01-11T00:00:00.000Z",
  },
  {
    id: "PRD012", name: "Dumbbell Set 20kg", description: "Adjustable dumbbell set for home gym. Solid cast iron construction.", categoryId: "CAT005", brand: "Kore", price: 2499, discount: 5, stock: 20, rating: 4.3, images: ["https://picsum.photos/seed/dumbbell/600/600"], isFeatured: false, createdAt: "2025-01-12T00:00:00.000Z",
  },
  {
    id: "PRD013", name: "Maybelline Fit Me Foundation", description: "Lightweight, natural coverage foundation that matches your skin.", categoryId: "CAT006", brand: "Maybelline", price: 549, discount: 15, stock: 90, rating: 4.2, images: ["https://picsum.photos/seed/foundation/600/600"], isFeatured: false, createdAt: "2025-01-13T00:00:00.000Z",
  },
  {
    id: "PRD014", name: "Lakme Rose Face Powder", description: "Translucent rose face powder for a natural, matte look.", categoryId: "CAT006", brand: "Lakme", price: 299, discount: 0, stock: 120, rating: 4.1, images: ["https://picsum.photos/seed/facepowder/600/600"], isFeatured: false, createdAt: "2025-01-14T00:00:00.000Z",
  },
  {
    id: "PRD015", name: "LEGO Technic Formula E Car", description: "2022 Formula E Race Car building set with 422 pieces.", categoryId: "CAT007", brand: "LEGO", price: 4499, discount: 8, stock: 35, rating: 4.7, images: ["https://picsum.photos/seed/lego/600/600"], isFeatured: false, createdAt: "2025-01-15T00:00:00.000Z",
  },
  {
    id: "PRD016", name: "Barbie Dreamhouse", description: "Massive 3-story dollhouse with elevator, pool, and 70+ accessories.", categoryId: "CAT007", brand: "Mattel", price: 6999, discount: 10, stock: 18, rating: 4.8, images: ["https://picsum.photos/seed/barbie/600/600"], isFeatured: true, createdAt: "2025-01-16T00:00:00.000Z",
  },
  {
    id: "PRD017", name: "Tata Sampann Tur Dal 1kg", description: "High protein, unpolished toor dal with natural nutrients.", categoryId: "CAT008", brand: "Tata", price: 179, discount: 5, stock: 500, rating: 4.5, images: ["https://picsum.photos/seed/turdal/600/600"], isFeatured: false, createdAt: "2025-01-17T00:00:00.000Z",
  },
  {
    id: "PRD018", name: "Basmati Rice Premium 5kg", description: "Extra long grain, aromatic basmati rice aged 2 years.", categoryId: "CAT008", brand: "India Gate", price: 699, discount: 0, stock: 300, rating: 4.6, images: ["https://picsum.photos/seed/basmatirice/600/600"], isFeatured: false, createdAt: "2025-01-18T00:00:00.000Z",
  },
  {
    id: "PRD019", name: "OnePlus 12 5G", description: "Flagship killer with Snapdragon 8 Gen 3 and Hasselblad camera.", categoryId: "CAT001", brand: "OnePlus", price: 64999, discount: 8, stock: 22, rating: 4.6, images: ["https://picsum.photos/seed/oneplus12/600/600"], isFeatured: false, createdAt: "2025-01-19T00:00:00.000Z",
  },
  {
    id: "PRD020", name: "Nike Air Max 270", description: "Casual sneakers with Max Air unit for all-day comfort.", categoryId: "CAT002", brand: "Nike", price: 12995, discount: 20, stock: 45, rating: 4.5, images: ["https://picsum.photos/seed/nikeairmax/600/600"], isFeatured: true, createdAt: "2025-01-20T00:00:00.000Z",
  },
];
