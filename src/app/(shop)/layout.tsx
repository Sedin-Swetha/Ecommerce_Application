"use client";
// import { useRequireAuth } from "@/lib/auth/useRequireAuth";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer";
export default function ShopLayout({ children }: { children: React.ReactNode }) {
  // useRequireAuth(); // redirects to /login if not logged in
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

