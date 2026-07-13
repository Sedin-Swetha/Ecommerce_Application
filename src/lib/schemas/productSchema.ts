import { z } from "zod";
export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
  categoryId: z
    .string()
    .min(1, "Category is required"),
  brand: z
    .string()
    .min(1, "Brand is required"),
  price: z
    .number({ error: "Price must be a number" })
    .positive("Price must be greater than 0"),
  discount: z
    .number({ error: "Discount must be a number" })
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%"),
  stock: z
    .number({ error: "Stock must be a number" })
    .min(0, "Stock cannot be negative"),
  images: z
    .array(z.string().min(1, "Image URL is required"))
    .min(1, "At least one image URL is required"),
  isFeatured: z.boolean(),
});

export type ProductFormInput = z.infer<typeof productSchema>;
