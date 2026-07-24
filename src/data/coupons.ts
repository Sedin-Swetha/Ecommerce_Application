import { Coupon } from "@/types/coupon";

export const MOCK_COUPONS: Coupon[] = [
    {
        code: "SAVE10",
        type: "percent",
        value: 10,
        minOrderValue: 500,
        createdBy: "admin",
    },
    {
        code: "FLAT500",
        type: "flat",
        value: 500,
        minOrderValue: 2000,
        createdBy: "admin",
    },
    {
        code: "WELCOME",
        type: "flat",
        value: 100,
        minOrderValue: 0,
        createdBy: "admin",
    }
];
