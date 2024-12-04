import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Replace with your Cloudinary domain
      },
    ],
  },
};

export default nextConfig;

