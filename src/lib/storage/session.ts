import { User } from "@/types/user";
const KEY = "session";
export const saveSession = (user: User): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(user));
};
export const getSession = (): User | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
};
export const clearSession = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
};