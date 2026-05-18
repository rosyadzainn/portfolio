import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rosyadzain.vercel.app"),
  title: {
    default: "Rosyad Zain — Creative Developer & Real-Time 3D Artist",
    template: "%s | Rosyad Zain",
  },
  description: "Portfolio of Rosyad Zain — creative developer specializing in modern web experiences, Next.js applications, and cinematic real-time 3D environments using Unreal Engine 5.",
  keywords: ["Rosyad Zain", "creative developer", "Next.js", "React", "Unreal Engine 5", "3D artist", "web developer", "portfolio", "Indonesia"],
  authors: [{ name: "Rosyad Zain" }],
  creator: "Rosyad Zain",
  openGraph: {
    title: "Rosyad Zain — Creative Developer & Real-Time 3D Artist",
    description: "Creative developer building modern web experiences and cinematic real-time 3D environments with Unreal Engine 5.",
    type: "website",
    url: "https://rosyadzain.vercel.app",
    siteName: "Rosyad Zain Portfolio",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Rosyad Zain Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rosyad Zain — Creative Developer & Real-Time 3D Artist",
    description: "Creative developer building modern web experiences and cinematic real-time 3D environments.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div className="noise-overlay" />
        <div className="grid-overlay" />
        {/* Cinematic edge vignette */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "radial-gradient(ellipse 75% 60% at 50% 44%, transparent 25%, rgba(0,0,0,0.6) 100%)",
        }} />
        {children}
      </body>
    </html>
  );
}
