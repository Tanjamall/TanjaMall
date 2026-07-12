import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  // Allow the phone preview to receive fresh development code from this computer.
  allowedDevOrigins: ["192.168.11.117"]
};

export default nextConfig;
