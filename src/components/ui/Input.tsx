import {
  forwardRef,
  InputHTMLAttributes,
} from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef<
  HTMLInputElement,
  InputProps
>(({ label, className = "", ...props }, ref) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        ref={ref}
        {...props}
        className={`
          w-full
          rounded-lg
          border
          border-gray-300
          px-4
          py-3
          text-gray-900
          placeholder:text-gray-400
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          transition
          ${className}
        `}
      />
    </div>
  );
});

Input.displayName = "Input";

export default Input;