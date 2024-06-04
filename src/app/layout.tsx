import Footer from "@/components/sections/Footer";
import Navbar from "@/components/shared/Navbar";
import PurchaseTokensDrawer from "@/components/shared/PurchaseTokensDrawer";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/lib/providers/Providers";
import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const kanit = Kanit({ weight: "400", subsets: ["latin"], variable: "--font-kanit" });

export const metadata: Metadata = {
  title: "HashtagFast",
  description: "Social media content generated by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div>
            <Navbar />
            {children}
            <Footer />
            <Toaster />
            <PurchaseTokensDrawer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
