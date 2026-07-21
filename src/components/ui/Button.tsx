import { ButtonHTMLAttributes } from "react";

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> { }

export default function Button({
    children,
    className = "",
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            className={`
        w-full
        rounded-lg
        bg-primary
        px-4
        py-3
        font-medium
        text-white
        transition
        hover:bg-primary-dark
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
        >
            {children}
        </button>
    );
}