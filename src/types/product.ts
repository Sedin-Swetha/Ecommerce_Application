export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  brand: string;
  price: number;
  discount: number;
  stock: number;
  rating: number;
  images: string[];
  isFeatured: boolean;
  createdAt: string;
}
export interface Review {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
export interface CartItem {
  productId: string;
  quantity: number;
}
