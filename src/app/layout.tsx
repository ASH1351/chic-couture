import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Great_Vibes } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { WishlistDrawer } from "@/components/ui/WishlistDrawer";
import { QuickViewModal } from "@/components/ui/QuickViewModal";
import { SearchModal } from "@/components/ui/SearchModal";
import { WhatsAppFloating } from "@/components/ui/WhatsAppFloating";
import { ToastNotification } from "@/components/ui/ToastNotification";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chiccouture.com"),
  title: {
    default: "Chic Couture | Women's Fashion, Designer Dresses & Beauty - Wear Confidence",
    template: "%s | Chic Couture",
  },
  description:
    "Award-level luxury fashion house. Handcrafted evening gowns, zardozi sarees, tailored co-ords, and haute parfumerie. Wear Confidence with Chic Couture.",
  keywords: [
    "women's fashion store",
    "designer dresses",
    "boutique clothing",
    "online clothing store",
    "ethnic wear",
    "party wear",
    "co-ord sets",
    "evening gowns",
    "haute couture",
    "fashion and beauty",
    "Chic Couture",
  ],
  authors: [{ name: "Maison Chic Couture" }],
  creator: "Maison Chic Couture",
  publisher: "Chic Couture Luxury Group",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/chic-couture-logo.png",
  },
  openGraph: {
    title: "Chic Couture | Wear Confidence",
    description: "Discover bespoke evening wear, designer sarees, co-ords, and haute parfumerie.",
    url: "https://chiccouture.com",
    siteName: "Chic Couture",
    images: [
      {
        url: "/chic-couture-logo.png",
        width: 1200,
        height: 630,
        alt: "Chic Couture Official Logo & Silhouette",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chic Couture | Wear Confidence",
    description: "Award-level luxury fashion store and boutique brand.",
    images: ["/chic-couture-logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://chiccouture.com/#organization",
        name: "Chic Couture",
        url: "https://chiccouture.com",
        logo: "https://chiccouture.com/chic-couture-logo.png",
        slogan: "Wear Confidence",
        sameAs: [
          "https://instagram.com/chiccouture",
          "https://facebook.com/chiccouture",
          "https://pinterest.com/chiccouture",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-98765-43210",
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["en", "hi"],
        },
      },
      {
        "@type": "ClothingStore",
        "@id": "https://chiccouture.com/#store",
        name: "Maison Chic Couture Boutique",
        image: "https://chiccouture.com/chic-couture-logo.png",
        address: {
          "@type": "PostalAddress",
          streetAddress: "14 Altamount Road, Cumballa Hill",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          postalCode: "400026",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "18.9667",
          longitude: "72.8080",
        },
        telephone: "+91-98765-43210",
        priceRange: "₹₹₹₹",
      },
      {
        "@type": "WebSite",
        "@id": "https://chiccouture.com/#website",
        url: "https://chiccouture.com",
        name: "Chic Couture",
        publisher: {
          "@id": "https://chiccouture.com/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://chiccouture.com/shop?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} ${greatVibes.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#FBF9F4] text-[#0B0B0B] antialiased selection:bg-[#C9A24B] selection:text-[#0B0B0B]">
        <CartProvider>
          <SmoothScroll>
            {/* Custom Desktop Gold Magnetic Cursor */}
            <CustomCursor />

            {/* Sticky Glass Luxury Navigation Bar */}
            <Navbar />

            {/* Main Application Content */}
            <div className="relative z-10">{children}</div>

            {/* Rich Black Luxury Footer */}
            <Footer />

            {/* Slide-over Drawers & Modals */}
            <CartDrawer />
            <WishlistDrawer />
            <QuickViewModal />
            <SearchModal />
            <WhatsAppFloating />
            <ToastNotification />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
