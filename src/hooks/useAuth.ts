"use client";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { userAtom } from "@/store/userAtom";
import { cartAtomWithSync } from "@/store/cartAtom";
import { wishlistAtomWithSync } from "@/store/wishlistAtom";
import { users } from "@/data/user";
import { cartStorage } from "@/lib/storage/cart";
import { wishlistStorage } from "@/lib/storage/wishlist";
import { LoginInput, RegisterInput, User } from "@/types/user";
import { UserRole } from "@/types/enums";
export const useAuth = () => {
    const [user, setUser] = useAtom(userAtom);
    const [, setCart] = useAtom(cartAtomWithSync);
    const [, setWishlist] = useAtom(wishlistAtomWithSync);
    const router = useRouter();
    const login = (data: LoginInput): User => {
        const existingUser = users.find(
            (u) =>
                u.email === data.email &&
                u.password === data.password
        );
        if (!existingUser) {
            throw new Error("Invalid credentials");
        }
        if (existingUser.isBlocked) {
            throw new Error("User is Blocked");
        }
        setUser(existingUser);
        router.push(
            existingUser.role === UserRole.ADMIN
                ? "/admin"
                : "/products"
        );
        return existingUser;
    };
    const register = (data: RegisterInput): User => {
        const newUser: User = {
            id: crypto.randomUUID(),
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            role: UserRole.USER,
            isBlocked: false,
            createdAt: new Date().toISOString(),
        };
        users.push(newUser);
        setUser(newUser);
        router.push("/products");
        return newUser;
    };
    const logout = () => {
        setUser(null);
        setCart([]);
        setWishlist([]);
        cartStorage.clear();
        wishlistStorage.clear();
        router.push("/login");
    };
    return { user, login, logout, register };
};