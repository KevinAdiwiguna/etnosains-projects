import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "20.189.93.251",
        port: "8333",
        pathname: "/**",
      },
    ],
  }
};

export default nextConfig;
