/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withPWA = require("next-pwa")({
  dest: "src/public",
});

const nextConfig = {};

module.exports = withBundleAnalyzer(withPWA(nextConfig));
