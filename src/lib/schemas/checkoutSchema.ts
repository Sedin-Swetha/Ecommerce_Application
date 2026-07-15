import { z } from "zod";
export const checkoutSchema = z.object({
    fullName: z
        .string()
        .min(1, "Full name is required"),
    phone: z
        .string()
        .min(1, "Phone number is required")
        .regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
    addressLine1: z
        .string()
        .min(1, "Address is required"),
    addressLine2: z.string().optional(),
    city: z
        .string()
        .min(1, "City is required"),
    state: z
        .string()
        .min(1, "Please select a state"),
    pincode: z
        .string()
        .min(1, "Pincode is required")
        .regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
