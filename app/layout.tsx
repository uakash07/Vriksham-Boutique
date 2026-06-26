import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ClientProviders from "@/components/home/ClientProviders";

export const metadata: Metadata = {
  title: "Vriksham Boutique — Handpicked Sarees for Every Occasion",
  description:
    "Discover premium handpicked sarees for weddings, festivals, and everyday elegance. Silk, Cotton, Banarasi, Organza and more — curated by Vriksham Boutique, Chennai.",
  keywords: "sarees, silk sarees, Chennai boutique, wedding sarees, Banarasi, Vriksham",
  openGraph: {
    title: "Vriksham Boutique",
    description: "Handpicked Sarees for Every Occasion",
    siteName: "Vriksham Boutique",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProviders />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
