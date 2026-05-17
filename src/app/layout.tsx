import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rosyad Zain — Creative Developer & Real-Time 3D Artist",
  description: "Portfolio of Rosyad Zain — creative developer specializing in modern web experiences and cinematic real-time 3D environments using Unreal Engine 5.",
  openGraph: {
    title: "Rosyad Zain — Creative Developer & Real-Time 3D Artist",
    description: "Creative developer building modern web experiences and cinematic real-time 3D environments.",
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
