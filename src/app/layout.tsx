import type { Metadata } from "next";
import { Poppins, Pixelify_Sans, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import { PlayerProvider } from "@/context/PlayerContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-pixel",
  display: "swap",
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pixel-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Regent Journey | Prospect Digital Guide",
  description:
    "Prospect Digital Guide for the Rotaract Club of Seethawaka Regent. Level up your journey in leadership, fellowship, and community service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${pixelify.variable} ${pressStart.variable}`}>
      <body className="bg-[#02091F] text-white antialiased min-h-screen flex flex-col selection:bg-regent-blue selection:text-black retro-grid">
        <PlayerProvider>
          <Navbar />
          <main className="flex-1 pb-28 md:pb-16">{children}</main>
          <Footer />
          <BottomNav />
        </PlayerProvider>
      </body>
    </html>
  );
}
