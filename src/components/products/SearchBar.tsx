interface Props {
	value: string;
	onChange: (value: string) => void;
}
export default function SearchBar({
	value,
	onChange,
}: Props) {
	return (
		<input
			value={value}
			onChange={(e) =>
				onChange(e.target.value)
			}
			placeholder="Search products..."
			className="w-full border p-3 rounded-lg"
		/>
	);
}