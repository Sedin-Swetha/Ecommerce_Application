export default function AnnouncementBar() {
  const message = "🚚 FREE SHIPPING ON ALL ORDERS ABOVE ₹299  •  🎉 SALE IS LIVE! UP TO 50% OFF  •  🛍️ NEW ARRIVALS EVERY WEEK  •  💳 EMI AVAILABLE ON ORDERS ABOVE ₹999  •";
  return (
    <div className="w-full overflow-hidden bg-primary py-1.5">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-xs font-semibold text-white px-4">{message}</span>
        <span className="text-xs font-semibold text-white px-4" aria-hidden>{message}</span>
      </div>
    </div>
  );
}