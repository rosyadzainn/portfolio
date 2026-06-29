import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import GlobalUI from "@/components/GlobalUI";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rosyadzain.com"),
  title: {
    default: "Rosyad Zain — Product Designer",
    template: "%s | Rosyad Zain",
  },
  description: "Portfolio of Rosyad Zain — product designer & web developer building clean, high-impact digital products. Product design, UI/UX, and web development.",
  keywords: ["Rosyad Zain", "product designer", "web developer", "UI/UX design", "web development", "Next.js", "React", "Figma", "brand identity", "portfolio", "Indonesia"],
  authors: [{ name: "Rosyad Zain" }],
  creator: "Rosyad Zain",
  openGraph: {
    title: "Rosyad Zain — Product Designer & Web Developer",
    description: "Building clean, high-impact digital products — product design, UI/UX, and web development.",
    type: "website",
    url: "https://rosyadzain.com",
    siteName: "Rosyad Zain Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rosyad Zain — Product Designer & Web Developer",
    description: "Building clean, high-impact digital products — product design, UI/UX, and web development.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rosyad Zain",
  url: "https://rosyadzain.com",
  image: "https://rosyadzain.com/opengraph-image",
  jobTitle: "Product Designer & Web Developer",
  description: "Product designer & web developer building clean, high-impact digital products.",
  knowsAbout: ["Product Design", "UI/UX Design", "Web Development", "Next.js", "React", "Brand Identity", "Figma", "Design Systems"],
  sameAs: [
    "https://github.com/rosyadzainn",
    "https://www.linkedin.com/in/rosyadzain/",
    "https://www.tiktok.com/@rosyadzainn",
  ],
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
