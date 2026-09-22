import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a plain HTML/CSS/JS bundle into `out/` instead of a Node server build.
  // Every route here is static, and Cloudflare serves files, not a Node server.
  output: "export",
  // Hides the Next.js dev-tools badge in the corner during `npm run dev`.
  // It never appears in a production build either way.
  devIndicators: false,
  images: {
    // The built-in image optimizer needs a server; static export has none.
    // All our images are local files under `public/assets`, already sized.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
