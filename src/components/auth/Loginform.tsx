"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema, LoginInput } from "@/lib/schemas/authSchemas";
import { UserRole } from "@/types/enums";
export default function LoginForm() {
    const router = useRouter();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema), 
    });
    const onSubmit = async (data: LoginInput) => {
        setError("");
        try {
            const authenticatedUser = await login(data);
            if (authenticatedUser.role === UserRole.ADMIN) {
                router.push("/admin");
            } else {
                router.push("/products");
            }
        } catch (error) {
            setError(
                error instanceof Error ? error.message : "Login failed"
            );
        }
    };
    return (
        <div className="w-full max-w-[500px] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-6 shadow-xl sm:px-10 sm:py-12 mx-auto relative z-10 my-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                <div className="text-center mb-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Sign in to your account
                    </p>
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
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                
                {error && (
                    <div className="rounded-lg bg-red-50 dark:bg-red-900/30 p-3 text-sm text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}
                
                <div className="pt-2">
                    <Button type="submit" disabled={isSubmitting} className="w-full py-3 text-sm sm:text-base font-semibold">
                        {isSubmitting ? "Signing In..." : "Login"}
                    </Button>
                </div>
                <div className="text-center pt-2 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{" "}
                        <Link 
                            href="/register" 
                            className="font-semibold text-primary hover:underline ml-1"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}