import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import AboutClient from "./AboutClient";
import "./about.css";

export const metadata: Metadata = {
  title: "About Us | IBTU — It's Bigger Than Us",
  description:
    "Since 2020, IBTU has grown from a pandemic-era response team into permanent community infrastructure serving Los Angeles and beyond.",
};

export default function AboutPage() {
  return (
    <>
      <AboutClient />
      <Footer />
    </>
  );
}
