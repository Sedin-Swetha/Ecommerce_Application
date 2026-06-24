import { defaultCategories } from "@/data/categories";
import { defaultProducts } from "@/data/products";
interface Props {
    category: string;
    setCategory: (value: string) => void;
    brand: string;
    setBrand: (value: string) => void;
    priceRange: string;
    setPriceRange: (value: string) => void;
    discount: string;
    setDiscount: (value: string) => void;
}
export default function FilterSidebar({ category, setCategory, brand, setBrand, priceRange, setPriceRange, discount, setDiscount, }: Props) {
    const brands = [...new Set(defaultProducts.map((p) => p.brand)),];
    return (
        <div
            className="space-y-6 rounded-xl border bg-white p-4 shadow-sm lg:sticky lg:top-24">
            <div>
                <h3 className="mb-3 font-semibold"> Category </h3>
                <label className="flex items-center gap-2 text-sm">
                    <input type="radio" checked={category === ""}
                    onChange={() => setCategory("")} /> All Categories</label>
                    {defaultCategories.map((cat) => (
                    <label
                        key={cat.id}
                        className="mt-2 flex items-center gap-2 text-sm">
                        <input type="radio" checked={category === cat.id}
                        onChange={() =>setCategory(cat.id)}/>
                        {cat.name}
                    </label> ))}
            </div>
            <div>
                <h3 className="mb-3 font-semibold">Brand</h3>
                <select
                    value={brand}
                    onChange={(e) =>setBrand(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm " >
                    <option value=""> All Brands </option>
                    {brands.map((b) => (<option key={b} value={b}> {b}</option>))}
                </select>
            </div>
            <div>
                <h3 className="mb-3 font-semibold">Price</h3>
                <select
                    value={priceRange}
                    onChange={(e) =>setPriceRange(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm">
                    <option value=""> All Prices</option>
                    <option value="0-1000"> Under ₹1000</option>
                    <option value="1000-5000">₹1000 - ₹5000</option>
                    <option value="5000-20000">₹5000 - ₹20000</option>
                    <option value="20000+">Above ₹20000</option>
                </select>
            </div>
            <div>
                <h3 className="mb-3 font-semibold">Discount </h3>
                <select
                    value={discount}
                    onChange={(e) =>setDiscount(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2.5text-sm" >
                    <option value="">All Discounts </option>
                    <option value="10">10% & Above</option>
                    <option value="20">20% & Above</option>
                    <option value="30">30% & Above</option>
                </select>
            </div>
        </div>
    );
}