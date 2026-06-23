"use client";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import ProfileDetails from "@/components/profile/ProfileDetails";
export default function ProfilePage() {
       const {user}=useAuth();
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
        <div className="mx-auto max-w-2xl px-4 py-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
            <ProfileDetails user={user} />
        </div>
    );
}