import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { SolarChatWidget } from "@/components/chat/SolarChatWidget";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} • ${SITE_CONFIG.descriptor} | Pakistan`,
  description: `${SITE_CONFIG.tagline} Professional residential, commercial, and industrial solar energy solutions in Pakistan, backed by international partner Alps Solar and local technical engineering.`,
  keywords: [
    "Solar Energy Pakistan",
    "JIENERGIES",
    "Alps Solar",
    "Net Metering Pakistan",
    "MEPCO Solar",
    "Multan Solar Energy",
    "South Punjab Solar Solutions",
    "Commercial Solar Solutions",
    "Residential Solar Sizing",
    "Lithium Battery Backup"
  ],
  authors: [{ name: "JIENERGIES Pakistan" }],
  metadataBase: new URL("https://jienergies.com"),
  openGraph: {
    title: `${SITE_CONFIG.name} • ${SITE_CONFIG.descriptor}`,
    description: `${SITE_CONFIG.tagline} Powering Pakistan's Clean Energy Future with engineering-led solar design.`,
    siteName: SITE_CONFIG.name,
    locale: "en_PK",
    type: "website",
  },
  icons: {
    icon: "/images/logo_icon.png",
    shortcut: "/images/logo_icon.png",
    apple: "/images/logo_icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo_icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo_icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-[#F5F7FA] text-gray-900 min-h-screen flex flex-col antialiased selection:bg-solar/30">
        <Navbar />
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        <Footer />
        <MobileBottomBar />
        <SolarChatWidget />
      </body>
    </html>
  );
}
