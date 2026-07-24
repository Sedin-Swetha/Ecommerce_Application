"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { registerSchema, RegisterInput } from "@/lib/schemas/authSchemas";
import { UserRole } from "@/types/enums";
export default function RegisterForm() {
    const router = useRouter();
    const { register: registerUser } = useAuth();
    const [error, setError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            role: UserRole.USER,
        },
    });
    const onSubmit = (data: RegisterInput) => {
        setError("");
        try {
            registerUser(data);
        } catch (error) {
            setError(
                error instanceof Error ? error.message : "Registration failed"
            );
        }
    };
    return (
        <div className="w-full max-w-[500px] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-6 shadow-xl sm:px-10 sm:py-12 mx-auto relative z-10 my-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                <div className="text-center mb-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Create Account</h2>
                    <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Register to start shopping
                    </p>
                </div>
                <div>
                    <Input
                        label="Full Name"
                        placeholder="Enter your name"
                        {...register("name")}
                    />
                    {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.name.message}
                        </p>
                    )}
                </div>
                <div>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div>
                    <Input
                        label="Phone Number"
                        placeholder="Enter your 10-digit phone number"
                        {...register("phone")}
                    />
                    {errors.phone && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.phone.message}
                        </p>
                    )}
                </div>
                <div>
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Create a password (min 6 characters)"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Register As
                    </label>
                    <select
                        {...register("role")}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                        <option value={UserRole.USER}>Customer</option>
                        <option value={UserRole.VENDOR}>Vendor</option>
                    </select>
                </div>
                {error && (
                    <div className="rounded-lg bg-red-50 dark:bg-red-900/30 p-3 text-sm text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}

                <div className="pt-2">
                    <Button type="submit" disabled={isSubmitting} className="w-full py-3 text-sm sm:text-base font-semibold">
                        {isSubmitting ? "Creating Account..." : "Create Account"}
                    </Button>
                </div>
                <div className="text-center pt-2 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-primary hover:underline ml-1"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}