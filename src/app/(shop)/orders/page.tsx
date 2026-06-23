"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import OrdersList from "@/components/orders/OrdersList";
export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted && !user) {
      router.push("/login");
    }
  }, [mounted, user, router]);
  if (!mounted) {
    return (
      <div className="flex items-center justify-center py-20">
        Loading...
      </div>
    );
  }
  if (!user) {
    return null;
  }
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        My Orders
      </h1>
      <OrdersList userId={user.id} />
    </div>
  );
}