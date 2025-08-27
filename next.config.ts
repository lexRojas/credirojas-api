// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // No bloquees el build por errores de ESLint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
