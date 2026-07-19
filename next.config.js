/** @type {import("next").NextConfig} */
const nextConfig = {
  distDir: "dist",

  images: {
    unoptimized: true
  },

  devIndicators: false,

  trailingSlash: true
};

export default nextConfig;
