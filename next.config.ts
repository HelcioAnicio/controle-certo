import type { NextConfig } from "next";

// This app is Brazil-only (pt-BR copy, BRL currency, no multi-timezone need),
// but the production server (Vercel) runs in UTC by default while every user
// is in America/Sao_Paulo. All the date math in this app (dueDateForPeriod,
// periodForDate, buildDailyLedger, the .toLocaleDateString() calls in Server
// Components, etc.) uses the JS runtime's *local* timezone via plain
// `new Date(y, m, d)` / `.getDate()` / `.toLocaleDateString()` — deliberately,
// so it matches what a browser in Brazil computes. Pinning the server's
// timezone here (before anything else reads `process.env.TZ`) makes "local"
// mean the same thing on the server as it does for every user, instead of
// dates silently shifting by a few hours (sometimes a full calendar day)
// between what someone picks in the UI and what lands in the database.
process.env.TZ = "America/Sao_Paulo";

const nextConfig: NextConfig = {
  // Add Next config here when needed.
};

export default nextConfig;
