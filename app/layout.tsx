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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "NonprofitOrganization"],
  name: "It's Bigger Than Us",
  alternateName: "IBTU",
  url: "https://ibtu.la",
  logo: "https://ibtu.la/favicon.ico",
  description:
    "IBTU builds trusted, place-based programs for Los Angeles communities — from fire relief and youth programming to back-to-school festivals and food access. Designed with dignity.",
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Baldwin Hills Crenshaw Plaza, Suite 224-226, 3650 W. Martin Luther King Jr. Blvd",
    addressLocality: "Los Angeles",
    addressRegion: "CA",
    postalCode: "90008",
    addressCountry: "US",
  },
  telephone: "+1-323-207-0221",
  email: "info@itsbiggerthanusla.org",
  sameAs: [
    "https://instagram.com/itsbiggerthanus",
  ],
  nonprofitStatus: "Nonprofit501c3",
  taxID: "85-3136505",
  areaServed: {
    "@type": "City",
    name: "Los Angeles",
  },
  slogan: "Community is the infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <FloatingNav />
        {children}
      </body>
    </html>
  );
}
