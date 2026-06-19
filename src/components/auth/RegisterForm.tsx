"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { validateRegister } from "@/lib/validators";
import { RegisterInput } from "@/types/user";
export default function RegisterForm() {
    const router = useRouter();
    const { register: registerUser } = useAuth();
    const [error, setError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterInput>();
    const onSubmit = (data: RegisterInput) => {
        setError("");
        const validationError = validateRegister(data);
        if (validationError) {
            setError(validationError);
            return;
        }
        try {
            registerUser(data);
            router.push("/products");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Registration failed"
            );
        }
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5">
            <div>
                <h2 className="text-2xl font-bold">Create Account</h2>
                <p className="text-sm text-gray-500">
                    Register to start shopping
                </p>
            </div>
            <div>
                <Input
                    label="Full Name"
                    placeholder="Enter your name"
                    {...register("name", {
                        required: "Name is required",
                    })}/>
                {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                    </p>
                )}
            </div>
            <div>
                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                        required: "Email is required",
                    })}
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                    </p>
                )}
            </div>
            <div>
                <Input
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    {...register("phone", {
                        required: "Phone number is required",
                    })}
                />
                {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.phone.message}
                    </p>
                )}
            </div>
            <div>
                <Input
                    label="Password"
                    type="password"
                    placeholder="Create a password"
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
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
            <Button type="submit">
                Create Account
            </Button>
        </form>
    );
}