"use client";
import { User } from "@/types/user";
interface Props {
    user: User;
}
const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
const Field = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-0.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {label}
        </span>
        <span className="text-sm font-medium text-gray-800">{value}</span>
    </div>
);
export default function ProfileDetails({ user }: Props) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                {user.profileImage ? (
                    <img
                        src={user.profileImage}
                        alt={user.name}
                        className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/20"
                    />
                ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-white ring-2 ring-primary/20">
                        {getInitials(user.name)}
                    </div>
                )}
                <div>
                    <p className="text-lg font-bold text-gray-900">{user.name}</p>
                    <span className="inline-flex items-center rounded-full bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary-dark capitalize mt-1">
                        {user.role.toLowerCase()}
                    </span>
                </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="text-sm font-semibold text-gray-700 mb-4">Account Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full Name" value={user.name} />
                    <Field label="Email Address" value={user.email} />
                    <Field label="Phone Number" value={user.phone} />
                    <Field label="Member Since" value={new Date(user.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })} />
                    {user.updatedAt && (
                        <Field label="Last Updated" value={new Date(user.updatedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })} />
                    )}
                    <Field label="Account Status" value={user.isBlocked ? "Blocked" : "Active"} />
                </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="text-sm font-semibold text-gray-700 mb-3">Account ID</h2>
                <p className="rounded-lg bg-gray-50 px-3 py-2 font-mono text-xs text-gray-500 break-all">
                    {user.id}
                </p>
            </div>
        </div>
    );
}