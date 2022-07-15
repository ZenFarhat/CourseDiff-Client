/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["frontendsimplified.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },

      use: ["@svgr/webpack"],
    })

    return config
  },
}

module.exports = nextConfig
