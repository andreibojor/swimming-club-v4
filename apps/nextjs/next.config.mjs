/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@acme/api", "@acme/db", "@acme/stripe", "@acme/ui"],
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: {
    mdxRs: true,
    serverActions: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com", "images.unsplash.com"],
  },
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default config;
