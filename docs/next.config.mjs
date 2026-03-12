import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  rewrites() {
    return [
      {
        destination: "/llms.mdx/docs/:path*",
        source: "/docs/:path*.mdx",
      },
      {
        destination: "/llms.mdx/docs/:lang/:path*",
        source: "/:lang/docs/:path*.mdx",
      },
    ];
  },
  serverExternalPackages: ["@takumi-rs/image-response"],
};

export default withMDX(config);
