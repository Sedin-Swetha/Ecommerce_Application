export const STORAGE_KEYS = {
  PRODUCTS: "shopease_products",
  CATEGORIES: "shopease_categories",
  ORDERS: "shopease_orders",
  USER: "shopease_user",
  AUTH_TOKEN: "shopease_auth_token",
  CART: "shopease_cart",
  WISHLIST: "shopease_wishlist",
  NOTIFICATIONS: "shopease_notifications",
  USERS: "shopease_users",
  COUPONS: "shopease_coupons",
} as const;
export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];