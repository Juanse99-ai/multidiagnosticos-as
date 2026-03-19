import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Multidiagnósticos AS | Taller automotriz y Autopartes en Sabanalarga",
  description:
    "Diagnóstico computarizado, mantenimiento automotriz y autopartes originales. Agenda tu servicio o compra online en Multidiagnósticos AS, Sabanalarga - Atlántico.",
  metadataBase: new URL("https://multidiagnosticosas.com"),
  openGraph: {
    type: "website",
    siteName: "Multidiagnósticos AS",
    title: "Taller automotriz y Autopartes | Multidiagnósticos AS",
    description:
      "Diagnóstico computarizado, mantenimiento y autopartes originales. Agenda o compra online.",
    url: "https://multidiagnosticosas.com/",
    images: ["/mascota.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taller automotriz y Autopartes | Multidiagnósticos AS",
    description:
      "Diagnóstico computarizado, mantenimiento y autopartes originales.",
    images: ["/mascota.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  other: {
    "theme-color": "#0B1221",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["AutoRepair", "AutomotiveBusiness", "Store"],
              name: "Multidiagnósticos AS",
              image: "https://multidiagnosticosas.com/mascota.png",
              url: "https://multidiagnosticosas.com/",
              telephone: "+57 300 365 1525",
              email: "contacto@multidiagnosticosas.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Cra. 27 #13-05",
                addressLocality: "Sabanalarga",
                addressRegion: "Atlántico",
                addressCountry: "CO",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "08:00",
                  closes: "17:30",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday"],
                  opens: "08:30",
                  closes: "16:00",
                },
              ],
              sameAs: [
                "https://www.facebook.com/multidiagnosticosas",
                "https://www.instagram.com/multidiagnosticosas",
                "https://www.tiktok.com/@multidiagnosticosas",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </Providers>
      </body>
    </html>
  );
}
