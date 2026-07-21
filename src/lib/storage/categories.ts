import { defaultCategories } from "@/data/categories";
import { STORAGE_KEYS } from "@/constants/StorageKeys";
export interface Category {
    id: string;
    name: string;
    image: string;
    description?: string;
}
export function getCategories(): Category[] {
    if (typeof window === "undefined") return defaultCategories;
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
        if (!raw) return defaultCategories;
        const parsed: Category[] = JSON.parse(raw);
        return parsed.length > 0 ? parsed : defaultCategories;
    } catch {
        return defaultCategories;
    }
}
export function saveCategories(categories: Category[]): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch {
        console.error("[storage] Failed to save categories");
    }
}
export function addCategory(category: Omit<Category, "id">): Category {
    const categories = getCategories();
    const newCategory: Category = {
        ...category,
        id: `CAT${Date.now()}`,
    };
    saveCategories([...categories, newCategory]);
    return newCategory;
}
export function updateCategory(
    id: string,
    updates: Partial<Omit<Category, "id">>
): Category | null {
    const categories = getCategories();
    let updated: Category | null = null;
    const next = categories.map((c) => {
        if (c.id !== id) return c;
        updated = { ...c, ...updates };
        return updated;
    });
    if (updated) saveCategories(next);
    return updated;
}
export function deleteCategory(id: string): boolean {
    const categories = getCategories();
    const next = categories.filter((c) => c.id !== id);
    if (next.length === categories.length) return false;
    saveCategories(next);
    return true;
}
export function seedCategories(): void {
    saveCategories(defaultCategories);
}
