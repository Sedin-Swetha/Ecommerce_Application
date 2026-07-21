import { UserRole } from "@/types/enums";
import { User } from "@/types/user";

export const users: User[] = [
    {
        id: "1",
        name: "Admin User",
        email: "admin@gmail.com",
        password: "admin123",
        role: UserRole.ADMIN,
        phone: "9876543210",
        isBlocked: false,
        createdAt: new Date().toISOString(),
    },
    {
        id: "2",
        name: "John Doe",
        email: "user@gmail.com",
        password: "user123",
        role: UserRole.USER,
        phone: "9876543211",
        isBlocked: false,
        createdAt: new Date().toISOString(),
    },
];