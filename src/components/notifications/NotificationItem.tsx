"use client";
import Link from "next/link";
import { AppNotification } from "@/types/notification";

interface Props {
  notification: AppNotification;
  onRead: (id: string) => void;
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationItem({ notification, onRead }: Props) {
  const content = (
    <div
      onClick={() => onRead(notification.id)}
      className={`flex gap-3 px-4 py-3 cursor-pointer transition hover:bg-gray-50 ${
        notification.read ? "" : "bg-primary/5"
      }`}
    >
      <span
        className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${
          notification.read ? "bg-transparent" : "bg-primary"
        }`}
      />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900">{notification.title}</p>
        <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">{notification.message}</p>
        <p className="mt-1 text-[10px] text-gray-400">{timeAgo(notification.createdAt)}</p>
      </div>
    </div>
  );

  if (notification.link) {
    return <Link href={notification.link}>{content}</Link>;
  }
  return content;
}