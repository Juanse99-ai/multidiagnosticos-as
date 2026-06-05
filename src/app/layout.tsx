import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--f-archivo",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Multidiagnósticos AS | Taller automotriz y Autopartes en Sabanalarga",
  description:
    "Taller automotriz en Sabanalarga: diagnóstico computarizado con escáner, mantenimiento, frenos, suspensión y autopartes originales. Desde 2021. Agenda por WhatsApp.",
  metadataBase: new URL("https://www.multidiagnosticosas.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Multidiagnósticos AS",
    locale: "es_CO",
    title: "Taller automotriz y Autopartes | Multidiagnósticos AS",
    description:
      "Diagnóstico computarizado, mantenimiento y autopartes en Sabanalarga. Desde 2021, +2.000 órdenes de servicio.",
    url: "https://www.multidiagnosticosas.com/",
    images: ["/hero/banner.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taller automotriz y Autopartes | Multidiagnósticos AS",
    description: "Diagnóstico computarizado, mantenimiento y autopartes en Sabanalarga.",
    images: ["/hero/banner.jpg"],
  },
  other: {
    "theme-color": "#FAFAF7",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${archivo.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["AutoRepair", "Store"],
              name: "Multidiagnósticos AS",
              image: "https://www.multidiagnosticosas.com/hero/banner.jpg",
              url: "https://www.multidiagnosticosas.com/",
              telephone: "+57 300 365 1525",
              email: "contacto@multidiagnosticosas.com",
              priceRange: "$$",
              currenciesAccepted: "COP",
              paymentAccepted: "Efectivo, Tarjeta, Transferencia",
              areaServed: { "@type": "City", name: "Sabanalarga, Atlántico" },
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
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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
      <body>{children}</body>
    </html>
  );
}
