import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
    webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/,
      use: "raw-loader",
    });
    return config;
  },
};
const withNextIntl = createNextIntlPlugin();
const config = withNextIntl(nextConfig);

export default config;
