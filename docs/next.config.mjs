import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { hostname: "unavatar.io", pathname: "/**", protocol: "https" },
    ],
  },
  reactStrictMode: true,
  rewrites() {
    return [
      {
        destination: "/llms.mdx/cli/:path*",
        source: "/cli/:path*.mdx",
      },
      {
        destination: "/llms.mdx/cli/:lang/:path*",
        source: "/:lang/cli/:path*.mdx",
      },
      {
        destination: "/llms.mdx/programs/:path*",
        source: "/programs/:path*.mdx",
      },
      {
        destination: "/llms.mdx/programs/:lang/:path*",
        source: "/:lang/programs/:path*.mdx",
      },
    ];
  },
  transpilePackages: ["@ossperks/core"],
};

export default withMDX(config);
