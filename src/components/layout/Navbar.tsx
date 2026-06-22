"use client"
import { useState } from "react";
import Link from "next/link";
import {ROUTES} from "@/constants/routes";
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link
                        href={ROUTES.HOME}
                        className="text-2xl font-bold text-blue-600">
                        ShopEase
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href={ROUTES.HOME}
                            className="font-medium text-gray-700 hover:text-blue-600 transition" >
                            Home
                        </Link>
                        <Link
                            href="/customer/products"
                            className="font-medium text-gray-700 hover:text-blue-600 transition">
                            Products
                        </Link>
                        <Link
                            href="#categories"
                            className="font-medium text-gray-700 hover:text-blue-600 transition" >
                            Categories
                        </Link>
                    </nav>
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href={ROUTES.LOGIN}
                            className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100" >
                            Login
                        </Link>
                        <Link
                            href={ROUTES.REGISTER}
                            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition" >
                            Register
                        </Link>
                    </div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-2xl md:hidden">
                        {isOpen ? "✕" : "☰"}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="border-t bg-white md:hidden">
                    <div className="flex flex-col gap-4 px-4 py-4">
                        <Link href="/" onClick={() => setIsOpen(false)}>
                            Home
                        </Link>
                        <Link
                            href="/customer/products"
                            onClick={() => setIsOpen(false)}>
                            Products
                        </Link>
                        <Link
                            href="#categories"
                            onClick={() => setIsOpen(false)}>
                            Categories
                        </Link>
                        <hr />
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}>
                            Login
                        </Link>
                        <Link
                            href="/register"
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-center text-white" >
                            Register
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}