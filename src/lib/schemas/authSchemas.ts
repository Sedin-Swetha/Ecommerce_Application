import { z } from "zod";
import { UserRole } from "@/types/enums";
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email format"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .min(2, "Name must be at least 2 characters"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email format"),
    phone: z
        .string()
        .min(1, "Phone number is required")
        .regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone number"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
    role: z.nativeEnum(UserRole),
});
export type RegisterInput = z.infer<typeof registerSchema>;
