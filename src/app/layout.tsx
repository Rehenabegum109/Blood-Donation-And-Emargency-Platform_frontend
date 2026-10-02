
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import QueryProvider from "../components/providers/QueryProvider";
import GoogleProvider from "../components/providers/GoogleProvider";
import { Toaster } from "sonner";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BloodLink",
  description: "Blood Donation & Emergency Assistance Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <GoogleProvider>
<Navbar />

        <main>
          {children}
            <Toaster />
        </main>
        <Footer/>
          </GoogleProvider>
   
        </QueryProvider>
     
      </body>
    </html>
  );
}