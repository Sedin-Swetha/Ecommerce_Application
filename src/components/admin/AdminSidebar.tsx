"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useAtom } from "jotai";
import { sidebarCollapsedAtom } from "@/store/sidebarAtom";
interface Props { user: { name: string; email: string }; }
const NAV_ITEMS = [
    {
        label: "Dashboard",
        href: "/admin",
        isActive: (pathname: string) => pathname === "/admin",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
        ),
    },
    {
        label: "Products",
        href: "/products",
        isActive: (pathname: string) => pathname.startsWith("/products"),
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
            </svg>
        ),
    },
    {
        label: "Categories",
        href: "/categories",
        isActive: (pathname: string) => pathname.startsWith("/categories"),
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
            </svg>
        ),
    },
    {
        label: "Orders",
        href: "/orders",
        isActive: (pathname: string) => pathname.startsWith("/orders"),
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <line x1="9" y1="12" x2="15" y2="12" />
                <line x1="9" y1="16" x2="13" y2="16" />
            </svg>
        ),
    },
    {
        // FIXED: was href:"#" with comingSoon:true — now a real route that points to your built page
        label: "Analytics",
        href: "/admin/analytics",
        isActive: (pathname: string) => pathname.startsWith("/admin/analytics"),
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
                <line x1="2" y1="20" x2="22" y2="20" />
            </svg>
        ),
    },
    {
        label: "Users",
        href: "/users",
        isActive: (pathname: string) => pathname.startsWith("/users"),
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
        ),
    }
];
export default function AdminSidebar({ user }: Props) {
    const pathname = usePathname();
    const { logout } = useAuth();
    const [collapsed, setCollapsed] = useAtom(sidebarCollapsedAtom);
    const [mobileOpen, setMobileOpen] = useState(false);
    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    const Logo = ({ small = false }: { small?: boolean }) => (
        <div className="flex items-center gap-2.5">
            <div className={`flex flex-shrink-0 items-center justify-center rounded-lg bg-primary ${small ? "h-7 w-7" : "h-8 w-8"}`}>
                <svg width={small ? 13 : 16} height={small ? 13 : 16} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                </svg>
            </div>
            {!small && (
                <div>
                    <p className="text-sm font-bold text-gray-100">ShopEase</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Admin Panel</p>
                </div>
            )}
        </div>
    );
    const Inner = ({ onNav }: { onNav?: () => void }) => (
        <div className="flex h-full flex-col">
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
                {NAV_ITEMS.map((item) => {
                    const active = item.isActive(pathname);
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={onNav}
                            title={collapsed ? item.label : undefined}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${collapsed ? "justify-center" : ""
                                } ${active
                                    ? "bg-primary text-white"
                                    : "text-gray-400 hover:bg-slate-900 hover:text-white"}`}>
                            <span className={`flex-shrink-0 ${active ? "text-white" : "text-gray-400"}`}>
                                {item.icon}
                            </span>
                            {!collapsed && item.label}
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t border-gray-800 px-3 py-4 space-y-1">
                {collapsed ? (
                    <div className="flex justify-center py-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                            {initials}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 rounded-xl bg-slate-900 px-3 py-2.5 mb-2">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                            {initials}
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-100">{user.name}</p>
                            <p className="text-[10px] text-gray-400">Administrator</p>
                        </div>
                    </div>
                )}
                <Link
                    href="/"
                    onClick={onNav}
                    title={collapsed ? "Back to Store" : undefined}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-slate-900 hover:text-white transition ${collapsed ? "justify-center" : ""
                        }`}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    {!collapsed && "Back to Store"}
                </Link>
                <button
                    onClick={() => { logout(); onNav?.(); }}
                    title={collapsed ? "Logout" : undefined}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-950 transition ${collapsed ? "justify-center" : ""
                        }`}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    {!collapsed && "Logout"}
                </button>
            </div>
        </div>
    );
    function SidebarBody({ onNav }: { onNav?: () => void }) {
        return <Inner onNav={onNav} />;
    }
    return (
        <>
            <div className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b border-gray-800 bg-slate-950 px-4 md:hidden">
                <Logo small />
                <span className="text-sm font-bold text-gray-100">Admin Panel</span>
                <button
                    onClick={() => setMobileOpen(true)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-gray-200 hover:bg-slate-800 transition"
                    aria-label="Open menu"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
            </div>
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/40 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}
            <aside
                className={`fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-gray-800 bg-slate-950 shadow-black/20 transition-transform duration-300 md:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex h-14 items-center justify-between border-b border-gray-800 px-4">
                    <Logo />
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-gray-200 hover:bg-slate-800 transition"
                        aria-label="Close menu"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <SidebarBody onNav={() => setMobileOpen(false)} />
            </aside>
            <aside
                className={`fixed left-0 top-0 z-40 hidden h-full flex-col border-r border-gray-800 bg-slate-950 shadow-black/10 transition-all duration-300 md:flex ${collapsed ? "w-16" : "w-60"
                    }`}
            >
                <div className={`flex h-16 items-center border-b border-gray-800 px-3 ${collapsed ? "justify-center" : "justify-between"}`}>
                    {!collapsed && <Logo />}
                    {collapsed && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5" />
                                <path d="M2 12l10 5 10-5" />
                            </svg>
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-slate-900 hover:text-white transition"
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {collapsed
                                ? <path d="M9 18l6-6-6-6" />
                                : <path d="M15 18l-6-6 6-6" />
                            }
                        </svg>
                    </button>
                </div>
                <SidebarBody />
            </aside>
        </>
    );
}