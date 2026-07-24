"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/enums";
import { useAtomValue } from "jotai";
import { sidebarCollapsedAtom } from "@/store/sidebarAtom";
function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const collapsed = useAtomValue(sidebarCollapsedAtom);
  if (!user || (user.role !== UserRole.ADMIN && user.role !== UserRole.VENDOR)) return null;
  return (
    <div className="flex flex-1 pt-16">
      <AdminSidebar user={user} />
      <main
        className={`flex-1 pt-14 md:pt-0 transition-all duration-300 ${
          collapsed ? "md:pl-16" : "md:pl-60"
        }`}
      >
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const isStrictAdminRoute = pathname.startsWith("/admin");
  const isSharedAdminRoute = ["/products", "/categories", "/orders", "/users"].some(p => pathname.startsWith(p));
  
  const isAdminOrVendor = user?.role === UserRole.ADMIN || user?.role === UserRole.VENDOR;
  const isVendorRestrictedRoute = ["/users", "/categories"].some(p => pathname.startsWith(p));

  const showAdminLayout = isStrictAdminRoute || (mounted && isAdminOrVendor && isSharedAdminRoute);
  
  useEffect(() => {
    if (mounted && user?.role === UserRole.VENDOR && isVendorRestrictedRoute) {
      router.push("/admin");
      return;
    }
    if (!isStrictAdminRoute) return;
    if (mounted && !user) {
      router.push("/login?redirect=/admin");
      return;
    }
    if (mounted && !isAdminOrVendor) {
      router.push("/");
    }
  }, [isStrictAdminRoute, user, router, mounted, isVendorRestrictedRoute, pathname]);

  if (showAdminLayout) {
    return (
      <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        <Navbar />
        <AdminLayout>{children}</AdminLayout>
      </div>
    );
  }
  if (!mounted) {
    return null; 
  }
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pt-28 sm:pt-20 lg:pt-16">{children}</main>
      <Footer />
    </div>
  );
}