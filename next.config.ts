import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.8"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/regions/uttar-pradesh-bhadohi",
        destination: "/regions/uttar-pradesh",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
