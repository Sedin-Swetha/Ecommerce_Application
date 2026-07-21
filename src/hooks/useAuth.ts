"use client";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { userAtom, usersAtom } from "@/store/userAtom";
import { cartAtomWithSync } from "@/store/cartAtom";
import { wishlistAtomWithSync } from "@/store/wishlistAtom";
import { cartStorage } from "@/lib/storage/cart";
import { wishlistStorage } from "@/lib/storage/wishlist";
import { LoginInput, RegisterInput, User } from "@/types/user";
import { UserRole } from "@/types/enums";
export const useAuth = () => {
    const [user, setUser] = useAtom(userAtom);
    const [users, setUsers] = useAtom(usersAtom);
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
        const maxId = users.reduce((max, u) => {
            const num = parseInt(u.id, 10);
            return isNaN(num) ? max : Math.max(max, num);
        }, 0);
        const nextId = String(maxId + 1);

        const newUser: User = {
            id: nextId,
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            role: UserRole.USER,
            isBlocked: false,
            createdAt: new Date().toISOString(),
        };
        setUsers([...users, newUser]);
        setUser(newUser);
        router.push("/products");
        return newUser;
    };
    const updateProfile = (
        data: Partial<Pick<User, "name" | "email" | "phone">>
    ): User => {
        if (!user) {
            throw new Error("No user is logged in");
        }
        const emailTaken = data.email
            ? users.some((u) => u.id !== user.id && u.email === data.email)
            : false;
        if (emailTaken) {
            throw new Error("That email is already in use");
        }
        const updatedUser: User = { ...user, ...data };
        setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
        setUser(updatedUser);
        return updatedUser;
    };
    const logout = () => {
        setUser(null);
        setCart([]);
        setWishlist([]);
        cartStorage.clear();
        wishlistStorage.clear();
        window.location.href = "/";
    };

    return { user, login, register, updateProfile, logout };
};