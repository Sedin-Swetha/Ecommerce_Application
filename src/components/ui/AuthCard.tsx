interface AuthCardProps {
  children: React.ReactNode;
}

export default function AuthCard({
  children,
}: AuthCardProps) {
  return (
    <div
      className="
      w-full
      max-w-md
      rounded-xl
      border
      border-gray-200
      bg-white
      p-8
      shadow-md
    "
    >
      {children}
    </div>
  );
}