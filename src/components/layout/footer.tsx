import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white">
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
                    <div>
                        <h2 className="text-2xl font-bold text-blue-400">
                            ShopEase
                        </h2>
                        <p className="mt-2 text-sm text-gray-400">
                            Quality products at affordable prices.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <Link href="/" className="transition hover:text-blue-400">
                            Home
                        </Link>
                        <Link
                            href="/customer/products"
                            className="transition hover:text-blue-400"
                        >
                            Products
                        </Link>
                        {/* <Link
                            href="/login"
                            className="transition hover:text-blue-400"
                        >
                            Login
                        </Link> */}
                    </div>
                    <div>
                        <a
                            href="mailto:support@shopease.com"
                            className="text-sm text-gray-400 transition hover:text-blue-400 break-all"
                        >
                            support@shopease.com
                        </a>
                    </div>
                </div>
                <div className="mt-6 border-t border-slate-700 pt-4 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} ShopEase. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}