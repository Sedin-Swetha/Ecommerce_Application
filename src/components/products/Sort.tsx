interface Props {
  sortBy: string;
  onChange: (value: string) => void;
}
export default function SortDropdown({ sortBy, onChange }: Props) {
  return (
    <select
      value={sortBy}
      onChange={(e) => onChange(e.target.value)}
      className="
        rounded-xl border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        px-3 py-2 text-sm
        outline-none cursor-pointer
        focus:border-primary focus:ring-1 focus:ring-primary
        transition-colors
      "
    >
      <option value="">Default</option>
      <option value="price-low-high">Price Low → High</option>
      <option value="price-high-low">Price High → Low</option>
      <option value="rating">Rating</option>
      <option value="discount">Discount</option>
      <option value="name">Name (A–Z)</option>
    </select>
  );
}