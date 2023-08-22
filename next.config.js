/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  trailingSlash: true,
  swcMinify: false,

  images: {
    loader: "akamai",
    path: "/",
  },
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
      topLevelAwait: true,
    };
    return config;
  },
};
module.exports = nextConfig;
