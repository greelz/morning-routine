import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Remove the default SVG loader first
    const fileLoaderRule = config.module.rules.find(
      (rule: any) => rule.test?.test?.(".svg")
    );

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/;
    }

    // Add SVGR loader
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;

