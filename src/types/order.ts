export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";
export type PaymentMethod = "cod" | "upi" | "card";
export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}
export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  image: string;
  price: number;        
  discountedPrice: number;
  quantity: number;
}
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;     
  shippingCharge: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}