import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://api.cacolombia.com/v1/**")
    ]
  },
  allowedDevOrigins: [
    "test.cacolombia.com",
    "*.cacolombia.com",
  ]
};

export default nextConfig;
