import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import FloatingNav from "@/components/layout/FloatingNav";

const poppins = Poppins({
  weight: ["300", "400", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-poppins-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "It's Bigger Than Us (IBTU) | Community is the Infrastructure",
  description:
    "IBTU builds trusted, place-based programs for Los Angeles communities — from fire relief and youth programming to back-to-school festivals and food access. Designed with dignity.",
  openGraph: {
    title: "It's Bigger Than Us (IBTU)",
    description: "Community is the infrastructure. Trusted, place-based programs in Los Angeles.",
    url: "https://ibtu.la",
    siteName: "IBTU",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <FloatingNav />
        {children}
      </body>
    </html>
  );
}
