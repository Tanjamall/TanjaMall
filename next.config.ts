import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  typedRoutes: true,
  // Allow the phone preview to receive fresh development code from this computer.
  allowedDevOrigins: ["192.168.11.117"]
};

export default nextConfig;

initOpenNextCloudflareForDev();
