"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer";
import AdminSidebar from "@/components/admin/adminSidebar";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/enums";
import { useAtomValue } from "jotai";
import { sidebarCollapsedAtom } from "@/store/sidebarAtom";
function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const collapsed = useAtomValue(sidebarCollapsedAtom);
  if (!user || user.role !== UserRole.ADMIN) return null;
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <AdminSidebar user={user} />
      <main
        className={`min-h-screen pt-14 md:pt-0 transition-all duration-300 ${
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
  const isAdminRoute = pathname.startsWith("/admin");
  useEffect(() => {
    if (!isAdminRoute) return;
    if (!user) {
      router.push("/login?redirect=/admin");
      return;
    }
    if (user.role !== UserRole.ADMIN) {
      router.push("/");
    }
  }, [isAdminRoute, user, router]);
  if (isAdminRoute) {
    return <AdminLayout>{children}</AdminLayout>;
  }
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pt-28 sm:pt-20 lg:pt-16">{children}</main>
      <Footer />
    </div>
  );
}