const KEY = "wishlist";
export const wishlistStorage = {
  get: (): string[] => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  },
  set: (ids: string[]): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(ids));
  },
  clear: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(KEY);
  },
};