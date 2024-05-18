import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers/Providers";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
export const kanit = Kanit({ weight: "400", subsets: ["latin"], variable: "--font-kanit" });

export const metadata: Metadata = {
  title: "IdeaFizz",
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
          <div className="bg-gradient-to-r from-gray-900 to-slate-700">
            <Navbar />
            {children}
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
