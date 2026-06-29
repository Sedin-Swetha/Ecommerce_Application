"use client";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { usersAtom } from "@/store/userAtom";
import { User } from "@/types/user";
import { UserRole } from "@/types/enums";
export function useAdminUsers() {
    const [users, setUsers] = useAtom(usersAtom);
    const blockUser = useCallback((id: string) => {
        setUsers((prev) =>
            prev.map((u) => u.id === id ? { ...u, isBlocked: true, updatedAt: new Date().toISOString() } : u)
        );
    }, [setUsers]);
    const unblockUser = useCallback((id: string) => {
        setUsers((prev) =>
            prev.map((u) => u.id === id ? { ...u, isBlocked: false, updatedAt: new Date().toISOString() } : u)
        );
    }, [setUsers]);
    const changeRole = useCallback((id: string, role: UserRole) => {
        setUsers((prev) =>
            prev.map((u) => u.id === id ? { ...u, role, updatedAt: new Date().toISOString() } : u)
        );
    }, [setUsers]);
    const deleteUser = useCallback((id: string) => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
    }, [setUsers]);
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => !u.isBlocked).length;
    const blockedUsers = users.filter((u) => u.isBlocked).length;
    const adminUsers = users.filter((u) => u.role === UserRole.ADMIN).length;
    return {users,blockUser,unblockUser,changeRole,deleteUser,totalUsers,activeUsers,blockedUsers,adminUsers};
}