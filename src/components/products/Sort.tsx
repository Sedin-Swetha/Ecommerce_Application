interface Props {
  sortBy: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({
  sortBy,
  onChange,
}: Props) {
  return (
    <select
      value={sortBy}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded"
    >
      <option value="">Default</option>
      <option value="price-low-high">
        Price Low → High
      </option>
      <option value="price-high-low">
        Price High → Low
      </option>
      <option value="rating">
        Rating
      </option>
      <option value="discount">
        Discount
      </option>
      <option value="name">
        Name (A-Z)
      </option>
    </select>
  );
}