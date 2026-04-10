import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import TopNav from "@/components/layout/TopNav";
import SmoothScroll from "@/components/providers/SmoothScroll";


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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon",
  },
  openGraph: {
    title: "It's Bigger Than Us (IBTU)",
    description: "Community is the infrastructure. Trusted, place-based programs in Los Angeles.",
    url: "https://ibtu.la",
    siteName: "IBTU",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "It's Bigger Than Us (IBTU)",
    description: "Community is the infrastructure. Trusted, place-based programs in Los Angeles.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://ibtu.la",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://ibtu.la"),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "NonprofitOrganization"],
  name: "It's Bigger Than Us",
  alternateName: "IBTU",
  url: "https://ibtu.la",
  logo: "https://ibtu.la/icon.svg",
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
    "https://instagram.com/itsbiggerthanus_",
    "https://facebook.com/itsbiggerthanus",
    "https://tiktok.com/@itsbiggerthanus",
    "https://linkedin.com/company/its-bigger-than-us",
    "https://youtube.com/@itsbiggerthanus",
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
        {/* Safety net: reveal hidden GSAP targets if animations haven't fired after 4s */}
        <script dangerouslySetInnerHTML={{ __html: `setTimeout(function(){document.querySelectorAll('.gsap-reveal').forEach(function(el){if(getComputedStyle(el).opacity==='0')el.style.opacity='1'})},4000)` }} />
      </head>
      <body>
        <a
          href="#main-content"
          className="skip-to-content"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <TopNav />
          <div id="main-content">
            {children}
          </div>
        </SmoothScroll>
        <Script
          src="https://api.bloomerang.co/v1/WebsiteVisit?ApiKey=pub_a73727e3-a04d-11ee-96cb-0a3287177f03"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
