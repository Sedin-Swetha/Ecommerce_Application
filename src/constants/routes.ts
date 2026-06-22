export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  ADMIN: "/admin",
  CUSTOMER: "/customer",
  PRODUCT:   (id: string) => `/products/${id}`,
  CART:      "/cart",       
  WISHLIST:  "/wishlist",   
  ORDERS:    "/orders",
  DASHBOARD: "/dashboard",
};