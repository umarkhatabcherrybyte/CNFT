/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  trailingSlash: true,
  images: {
    loader: "akamai",
    path: "/",
  },
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
};
module.exports = nextConfig;
