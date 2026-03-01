import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // output: 'export', // Temporarily disabled — middleware requires server mode. Re-enable in Phase 8.
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
