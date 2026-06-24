"use client";
import { defaultCategories } from "@/data/categories";
interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  category?: string;
  onCategoryChange?: (cat: string) => void;
  showCategory?: boolean;
  placeholder?: string;
  compact?: boolean; // true = h-10 (navbar), false = h-12 (page)
}
export default function SearchBar({
  value,
  onChange,
  onSubmit,
  category = "",
  onCategoryChange,
  showCategory = true,
  placeholder = "Search products...",
  compact = false,
}: Props) {
  if (!onSubmit) {
    return (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    );
  }
  return (
    <form
      onSubmit={onSubmit}
      className={`flex items-stretch overflow-hidden rounded-lg border border-gray-300 transition focus-within:border-primary focus-within:ring-1 focus-within:ring-primary ${
        compact ? "h-10" : "h-12"
      }`}
    >
      {showCategory && onCategoryChange && (
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="shrink-0 border-r border-gray-300 bg-gray-50 px-3 text-sm text-gray-600 focus:outline-none cursor-pointer"
        >
          <option value="">All</option>
          {defaultCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Search"
        className="shrink-0 bg-primary px-4 text-white hover:bg-primary-dark transition flex items-center justify-center"
      >
        <svg width={compact ? 16 : 18} height={compact ? 16 : 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </form>
  );
}