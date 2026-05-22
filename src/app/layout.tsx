import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import GlobalUI from "@/components/GlobalUI";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rosyadzain.com"),
  title: {
    default: "Rosyad Zain — Creative Director · 3D Environment · Modern Web",
    template: "%s | Rosyad Zain",
  },
  description: "Portfolio of Rosyad Zain — Creative Director designing cinematic web experiences, brand identities, and 3D environment environments using Unreal Engine 5.",
  keywords: ["Rosyad Zain", "creative director", "creative developer", "3D environment", "Unreal Engine 5", "web design", "brand identity", "Figma", "modern web", "portfolio", "Indonesia"],
  authors: [{ name: "Rosyad Zain" }],
  creator: "Rosyad Zain",
  openGraph: {
    title: "Rosyad Zain — Creative Director · 3D Environment · Modern Web",
    description: "Designing cinematic web experiences, brand identities, and 3D environment environments — bridging premium visual design with modern AI-augmented workflows.",
    type: "website",
    url: "https://rosyadzain.com",
    siteName: "Rosyad Zain Portfolio",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Rosyad Zain Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rosyad Zain — Creative Director · 3D Environment · Modern Web",
    description: "Designing cinematic web experiences, brand identities, and 3D environment environments.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rosyad Zain",
  url: "https://rosyadzain.com",
  image: "https://rosyadzain.com/opengraph-image",
  jobTitle: "Creative Director & 3D Environment Artist",
  description: "Creative Director designing cinematic web experiences, brand identities, and 3D environment environments using Unreal Engine 5 — bridging premium visual design with modern AI-augmented workflows.",
  knowsAbout: ["Creative Direction", "Brand Identity", "Figma", "UI/UX Design", "Unreal Engine 5", "3D Environment", "Modern Web", "AI-Augmented Workflows"],
  sameAs: ["https://github.com/rosyadzainn"],
  worksFor: { "@type": "Organization", name: "Freelance" },
  address: { "@type": "PostalAddress", addressCountry: "ID" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="imvNYqUpeHpiNRoy9y9yXM9fMPfGggKvgl8iomoQGIg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div className="noise-overlay" />
        <div className="grid-overlay" />
        {/* Cinematic edge vignette */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "radial-gradient(ellipse 75% 60% at 50% 44%, transparent 25%, rgba(0,0,0,0.6) 100%)",
        }} />
        <GlobalUI />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
