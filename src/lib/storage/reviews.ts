import { Review } from "@/types/product";
const KEY = "reviews";
const DEFAULT_REVIEWS: Review[] = [
    {
        id: "REV-1",
        userId: "USR-1",
        userName: "Alex Johnson",
        productId: "PRD001",
        rating: 5,
        comment: "Amazing quality and fits perfectly. Highly recommend!",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
    {
        id: "REV-2",
        userId: "USR-2",
        userName: "Sarah Smith",
        productId: "PRD001",
        rating: 4,
        comment: "Good material, but shipping took a bit long.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    },
];

export const reviewsStorage = {
    get: (): Review[] => {
        if (typeof window === "undefined") return DEFAULT_REVIEWS;
        try {
            const raw = localStorage.getItem(KEY);
            if (raw) {
                return JSON.parse(raw) as Review[];
            }
            localStorage.setItem(KEY, JSON.stringify(DEFAULT_REVIEWS));
            return DEFAULT_REVIEWS;
        } catch {
            return DEFAULT_REVIEWS;
        }
    },
    set: (reviews: Review[]): void => {
        if (typeof window === "undefined") return;
        localStorage.setItem(KEY, JSON.stringify(reviews));
    },
    clear: (): void => {
        if (typeof window === "undefined") return;
        localStorage.removeItem(KEY);
    },
};
