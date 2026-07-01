import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Content-Security-Policy — strict in production, relaxed for local dev (HMR needs eval + websockets)
const csp = [
  "default-src 'self'",
  isProd
    ? "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  // local covers + data URIs + WordPress mShots screenshot fallback
  "img-src 'self' data: blob: https://s0.wordpress.com",
  "media-src 'self'",
  isProd
    ? "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com"
    : "connect-src 'self' ws: wss: https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "worker-src 'self' blob:",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // Force HTTPS for 2 years, include subdomains, allow preload list
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy",   value: csp },
  { key: "X-Frame-Options",           value: "DENY" },
  { key: "X-Content-Type-Options",    value: "nosniff" },
  { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control",    value: "on" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  {
    key: "Permissions-Policy",
    value: [
      "camera=()", "microphone=()", "geolocation=()", "payment=()",
      "usb=()", "magnetometer=()", "accelerometer=()", "gyroscope=()",
      "interest-cohort=()", "browsing-topics=()",
    ].join(", "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false, // remove X-Powered-By (don't advertise the stack)
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
