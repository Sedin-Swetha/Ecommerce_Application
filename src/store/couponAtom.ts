import { atomWithStorage } from "jotai/utils";
import { Coupon } from "@/types/coupon";
import { MOCK_COUPONS } from "@/data/coupons";
import { STORAGE_KEYS } from "@/constants/StorageKeys";

export const couponsAtom = atomWithStorage<Coupon[]>(STORAGE_KEYS.COUPONS, MOCK_COUPONS);
