import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/work/:slug/case-study-coming-soon",
        destination: "/work/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
