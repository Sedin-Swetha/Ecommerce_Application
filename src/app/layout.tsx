import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer";
import {JotaiProvider} from "@/components/providers/JotaiProvider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <JotaiProvider>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
        </JotaiProvider>
      </body>
    </html>
  );
}
// import "./globals.css";
// import { JotaiProvider } from "@/components/providers/JotaiProvider";

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <JotaiProvider>
//           {children}
//         </JotaiProvider>
//       </body>
//     </html>
//   );
// }
