"use client";
import { useState, useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { couponsAtom } from "@/store/couponAtom";
import { categoriesAtom } from "@/store/CategoryAtom";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/enums";
import { Coupon } from "@/types/coupon";
import { Toast } from "@/components/ui/Toast";

export default function AdminCouponsPage() {
    const { user } = useAuth();
    const [coupons, setCoupons] = useAtom(couponsAtom);
    const categories = useAtomValue(categoriesAtom);
    const [mounted, setMounted] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [code, setCode] = useState("");
    const [type, setType] = useState<"percent" | "flat">("percent");
    const [value, setValue] = useState(0);
    const [minOrderValue, setMinOrderValue] = useState(0);
    const [categoryId, setCategoryId] = useState("");

    useEffect(() => { setMounted(true); }, []);

    if (!mounted || !user) return null;
    const isAdmin = user.role === UserRole.ADMIN;
    const isVendor = user.role === UserRole.VENDOR;

    if (!isAdmin && !isVendor) return null;

    const visibleCoupons = isAdmin 
        ? coupons 
        : coupons.filter(c => c.vendorId === user.id);

    const handleCreateCoupon = (e: React.FormEvent) => {
        e.preventDefault();
        if (!code.trim() || value <= 0) return;
        if (type === "percent" && value > 100) {
            alert("Percentage discount cannot exceed 100%");
            return;
        }
        if (type === "flat" && minOrderValue > 0 && value > minOrderValue) {
            alert("Flat discount cannot exceed the minimum order value");
            return;
        }

        const newCoupon: Coupon = {
            code: code.trim().toUpperCase(),
            type,
            value,
            minOrderValue,
            createdBy: user.id,
        };

        if (isVendor) {
            newCoupon.vendorId = user.id;
        } else if (isAdmin && categoryId) {
            newCoupon.categoryId = categoryId;
        }

        setCoupons([newCoupon, ...coupons]);
        setCode("");
        setValue(0);
        setMinOrderValue(0);
        setCategoryId("");
        setShowToast(true);
    };

    const handleDelete = (codeToDelete: string) => {
        setCoupons(coupons.filter(c => c.code !== codeToDelete));
    };

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">Manage Coupons</h1>
            
            <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">Create New Coupon</h2>
                <form onSubmit={handleCreateCoupon} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-600">Coupon Code</label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm uppercase focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="e.g. SUMMER10"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-600">Discount Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value as "percent" | "flat")}
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            <option value="percent">Percentage (%)</option>
                            <option value="flat">Flat Amount (₹)</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-600">Discount Value</label>
                        <input
                            type="number"
                            min="1"
                            max={type === "percent" ? 100 : undefined}
                            value={value || ""}
                            onChange={(e) => setValue(parseInt(e.target.value) || 0)}
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-600">Min Order Value (₹)</label>
                        <input
                            type="number"
                            min="0"
                            value={minOrderValue || ""}
                            onChange={(e) => setMinOrderValue(parseInt(e.target.value) || 0)}
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    {isAdmin && (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-600">Restrict to Category (Optional)</label>
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                                <option value="">No Restriction (Global)</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="flex items-end lg:col-span-1">
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
                        >
                            Add Coupon
                        </button>
                    </div>
                </form>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                <div className="border-b border-gray-100 px-6 py-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Active Coupons</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                            <tr>
                                <th className="px-6 py-3 font-medium">Code</th>
                                <th className="px-6 py-3 font-medium">Discount</th>
                                <th className="px-6 py-3 font-medium">Min Order</th>
                                <th className="px-6 py-3 font-medium">Restrictions</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {visibleCoupons.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-gray-400">No coupons found.</td>
                                </tr>
                            )}
                            {visibleCoupons.map((coupon) => (
                                <tr key={coupon.code} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-bold text-gray-900">{coupon.code}</td>
                                    <td className="px-6 py-4 font-semibold text-emerald-600">
                                        {coupon.type === "percent" ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {coupon.minOrderValue > 0 ? `₹${coupon.minOrderValue}` : "None"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {coupon.vendorId ? (
                                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700">
                                                Vendor Only
                                            </span>
                                        ) : coupon.categoryId ? (
                                            <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-[10px] font-semibold text-purple-700">
                                                Category Specific
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-600">
                                                Global
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(coupon.code)}
                                            className="text-xs font-semibold text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Toast show={showToast} message="Coupon created successfully" type="success" onDone={() => setShowToast(false)} />
        </div>
    );
}
