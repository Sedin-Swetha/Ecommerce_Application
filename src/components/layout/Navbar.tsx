"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/UseWishlist";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/enums";
import SearchBar from "@/components/products/SearchBar";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (searchCategory) params.set("category", searchCategory);
    router.push(`/products?${params.toString()}`);
  }
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center gap-4">
            <span className="shrink-0 text-2xl font-bold text-primary">ShopEase</span>
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-4">
          <Link href={ROUTES.HOME} className="shrink-0 text-2xl font-bold text-primary">
            ShopEase
          </Link>
          <div className="hidden md:flex flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSubmit={handleSearch}
              category={searchCategory}
              onCategoryChange={setSearchCategory}
              showCategory={true}
              placeholder="Search products..."
              compact
            />
          </div>
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <>
              <Link href="/wishlist" className="relative flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-red-500 transition">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white leading-none">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="relative flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-primary transition">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white leading-none">
                    {cartCount}
                  </span>
                )}
              </Link>
              <div className="w-px h-6 bg-gray-200 mx-1" />
            </>
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-gray-100 transition"
                >
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.name} className="h-8 w-8 rounded-full object-cover ring-2 ring-primary/20" />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white ring-2 ring-primary/20">
                      {getInitials(user.name)}
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900 leading-none">{user.name.split(" ")[0]}</p>
                    <p className="text-[10px] text-gray-400 leading-none mt-0.5 capitalize">{user.role.toLowerCase()}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-100 bg-white shadow-lg py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    {user.role === UserRole.ADMIN && (
                      <Link href="/admin" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:bg-primary/5 transition">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                        Admin Dashboard
                      </Link>
                    )}
                    <Link href="/profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      My Profile
                    </Link>
                    <Link href="/orders" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /></svg>
                      My Orders
                    </Link>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={() => { setIsDropdownOpen(false); logout(); }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href={ROUTES.LOGIN} className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 transition">Login</Link>
                <Link href={ROUTES.REGISTER} className="rounded-lg bg-primary px-5 py-2 text-white hover:bg-primary-dark transition">Register</Link>
              </>
            )}
          </div>
          <div className="flex items-center gap-1 md:hidden ml-auto">
            <>
              <Link href="/wishlist" className="relative flex items-center justify-center w-9 h-9 rounded-lg text-gray-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white leading-none">{wishlistCount}</span>
                )}
              </Link>
              <Link href="/cart" className="relative flex items-center justify-center w-9 h-9 rounded-lg text-gray-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white leading-none">{cartCount}</span>
                )}
              </Link>
            </>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center w-9 h-9 text-xl text-gray-700">
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
        <div className="md:hidden pb-3">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={handleSearch}
            showCategory={false}
            placeholder="Search products..."
            compact
          />
        </div>
      </div>
      {isOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {user && (
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-3 mb-2">
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {getInitials(user.name)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            )}
            <Link href="/" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-50">Home</Link>
            <Link href="/products" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-50">Products</Link>
            <Link href="#categories" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-50">Categories</Link>
            <>
              <hr className="my-1" />
              <Link href="/wishlist" onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-50">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                Wishlist
                {wishlistCount > 0 && <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">{wishlistCount}</span>}
              </Link>
              <Link href="/cart" onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-50">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                Cart
                {cartCount > 0 && <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">{cartCount}</span>}
              </Link>
            </>
            <hr className="my-1" />
            {user ? (
              <>
                {user.role === UserRole.ADMIN && (
                  <Link href="/admin" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 font-medium text-primary hover:bg-primary/5">Admin Dashboard</Link>
                )}
                <Link href="/profile" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-50">My Profile</Link>
                <Link href="/orders" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-50">My Orders</Link>
                <button onClick={() => { setIsOpen(false); logout(); }} className="rounded-lg px-3 py-2 text-left font-medium text-red-500 hover:bg-red-50">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-50">Login</Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="rounded-lg bg-primary px-4 py-2 text-center font-medium text-white hover:bg-primary-dark">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}