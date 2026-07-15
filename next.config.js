/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "dist",

  images: {
    unoptimized: true
  },

  devIndicators: false,

  trailingSlash: true
};

export default nextConfig;
