import Link from "next/link";
export default function Footer() {
    return (
        <footer className="bg-white text-slate-900 dark:bg-slate-950 dark:text-gray-100">
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
                    <div>
                        <h2 className="text-2xl font-bold text-primary">
                            ShopEase
                        </h2>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Quality products at affordable prices.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <Link href="/" className="transition hover:text-primary">
                            Home
                        </Link>
                        <Link
                            href="/products"
                            className="transition hover:text-primary"
                        >
                            Products
                        </Link>
                    </div>
                    <div>
                        <a
                            href="mailto:support@shopease.com"
                            className="text-sm text-gray-500 transition hover:text-primary dark:text-gray-400"
                        >
                            support@shopease.com
                        </a>
                    </div>
                </div>
                <div className="mt-6 border-t border-gray-200 pt-4 text-center text-xs text-gray-500 dark:border-slate-700 dark:text-gray-400">
                    © {new Date().getFullYear()} ShopEase. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}