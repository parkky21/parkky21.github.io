import type { Metadata } from "next";
import { Poppins, Nunito, Caveat } from "next/font/google";
import "./globals.css";
import { SketchDefs } from "@/components/SketchDefs";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { profile } from "@/lib/data";

const poppins = Poppins({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const nunito = Nunito({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const caveat = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${nunito.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen bg-paper text-ink">
        <SketchDefs />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
