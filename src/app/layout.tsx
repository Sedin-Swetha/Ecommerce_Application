import "./globals.css";
import { JotaiProvider } from "@/components/providers/JotaiProvider";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <JotaiProvider>
          {children}
        </JotaiProvider>
      </body>
    </html>
  );
}