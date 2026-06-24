"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { validateLogin } from "@/lib/validators";
import { LoginInput } from "@/types/user";
import { UserRole } from "@/types/enums";
export default function LoginForm() {
    const router = useRouter();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const {
        register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<LoginInput>();
    const onSubmit = async (
        data: LoginInput) => {
        setError("");
        const validationError =
            validateLogin(data);
        if (validationError) {
            setError(validationError);
            return;
        }
        try {
            const authenticatedUser = login(data);
            if (
                authenticatedUser.role ===
                UserRole.ADMIN
            ) {
                router.push("/admin");
            } else {
                router.push("/products");
            }
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Login failed"
            );
        }
    };
    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4">
            <div
                className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Sign in to your account
                        </p>
                    </div>
                    <div>
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                            })} />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    {error && (
                        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}
                    <Button
                        type="submit"
                        disabled={isSubmitting}>
                        {isSubmitting
                            ? "Signing In..."
                            : "Login"}
                    </Button>
                </form>
            </div>
        </div>
    );
}