"use client";
import { useState } from "react";
import { ShippingAddress, PaymentMethod } from "@/types/order";
interface Props {
    onSubmit: (address: ShippingAddress, payment: PaymentMethod) => void;
    isLoading: boolean;
}
const STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Delhi", "Jammu and Kashmir",
    "Ladakh", "Lakshadweep", "Puducherry",
];
const PAYMENT_OPTIONS: { value: PaymentMethod; label: string; icon: string }[] = [
    { value: "cod", label: "Cash on Delivery", icon: "💵" },
    { value: "upi", label: "UPI", icon: "📱" },
    { value: "card", label: "Credit / Debit Card", icon: "💳" },
];
interface FieldProps {
    label: string;
    field: keyof ShippingAddress;
    placeholder?: string;
    type?: string;
    value: string;
    error?: string;
    onChange: (field: keyof ShippingAddress, value: string) => void;
}
function Field({ label, field, placeholder, type = "text", value, error, onChange }: FieldProps) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(field, e.target.value)}
                placeholder={placeholder}
                className={`rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-primary ${error ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
                    }`}
            />
            {error && <p className="text-[11px] text-red-500">{error}</p>}
        </div>
    );
}
export default function CheckoutForm({ onSubmit, isLoading }: Props) {
    const [address, setAddress] = useState<ShippingAddress>({
        fullName: "", phone: "", addressLine1: "",
        addressLine2: "", city: "", state: "", pincode: "",
    });
    const [payment, setPayment] = useState<PaymentMethod>("cod");
    const [errors, setErrors] = useState<Partial<ShippingAddress>>({});

    const handleChange = (field: keyof ShippingAddress, value: string) => {
        setAddress((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
    const validate = () => {
        const e: Partial<ShippingAddress> = {};
        if (!address.fullName.trim()) e.fullName = "Required";
        if (!/^\d{10}$/.test(address.phone)) e.phone = "Enter valid 10-digit number";
        if (!address.addressLine1.trim()) e.addressLine1 = "Required";
        if (!address.city.trim()) e.city = "Required";
        if (!address.state) e.state = "Required";
        if (!/^\d{6}$/.test(address.pincode)) e.pincode = "Enter valid 6-digit pincode";
        setErrors(e);
        return Object.keys(e).length === 0;
    };
    const handleSubmit = () => {
        if (validate()) onSubmit(address, payment);
    };
    return (
        <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-base font-bold text-gray-900">Shipping Address</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Full Name" field="fullName" placeholder="Suriya Kumar" value={address.fullName} error={errors.fullName} onChange={handleChange} />
                    <Field label="Phone Number" field="phone" placeholder="9876543210" type="tel" value={address.phone} error={errors.phone} onChange={handleChange} />
                    <div className="sm:col-span-2">
                        <Field label="Address Line 1" field="addressLine1" placeholder="House no., Street, Area" value={address.addressLine1} error={errors.addressLine1} onChange={handleChange} />
                    </div>
                    <div className="sm:col-span-2">
                        <Field label="Address Line 2 (optional)" field="addressLine2" placeholder="Landmark, etc." value={address.addressLine2 ?? ""} onChange={handleChange} />
                    </div>
                    <Field label="City" field="city" placeholder="Chennai" value={address.city} error={errors.city} onChange={handleChange} />
                    <Field label="Pincode" field="pincode" placeholder="600001" type="tel" value={address.pincode} error={errors.pincode} onChange={handleChange} />
                    <div className="flex flex-col gap-1 sm:col-span-2">
                        <label className="text-xs font-semibold text-gray-600">State</label>
                        <select
                            value={address.state}
                            onChange={(e) => handleChange("state", e.target.value)}
                            className={`rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-primary ${errors.state ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
                                }`}
                        >
                            <option value="">Select state</option>
                            {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.state && <p className="text-[11px] text-red-500">{errors.state}</p>}
                    </div>
                </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-base font-bold text-gray-900">Payment Method</h2>
                <div className="flex flex-col gap-2">
                    {PAYMENT_OPTIONS.map((opt) => (
                        <label
                            key={opt.value}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${payment === opt.value ? "border-primary bg-primary/5" : "border-gray-200 hover:bg-gray-50"
                                }`}
                        >
                            <input
                                type="radio"
                                name="payment"
                                value={opt.value}
                                checked={payment === opt.value}
                                onChange={() => setPayment(opt.value)}
                                className="accent-primary"
                            />
                            <span className="text-lg">{opt.icon}</span>
                            <span className="text-sm font-medium text-gray-800">{opt.label}</span>
                        </label>
                    ))}
                </div>
            </div>
            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white transition hover:bg-primary-dark active:scale-95 disabled:opacity-60"
            >
                {isLoading ? "Placing Order..." : "Place Order"}
            </button>
        </div>
    );
}