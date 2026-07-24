export interface Coupon {
  code: string;
  type: "percent" | "flat";
  value: number;
  minOrderValue: number;
  vendorId?: string;
  categoryId?: string;
  createdBy: string;
}
