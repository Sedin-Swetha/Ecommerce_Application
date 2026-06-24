import Link from "next/link";
export default function OfferBanner() {
  const offers = [
    {
      label: "🔥 Flash Sale",
      desc: "Up to 60% off on Electronics",
      cta: "Shop Now",
    },
    {
      label: "💎 Premium Deals",
      desc: "Exclusive brands, best prices",
      cta: "Explore",
    },
    {
      label: "🚚 Free Delivery",
      desc: "On orders above ₹499",
      cta: "Order Now",
    },
  ];
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <Link
              key={offer.label}
              href="/login"
              className="rounded-lg border bg-white p-5 transition hover:shadow-md">
              <p className="text-sm font-medium text-primary">
                {offer.label}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                {offer.desc}
              </h3>
              <span className="mt-4 inline-block text-sm font-medium text-primary">
                {offer.cta} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}