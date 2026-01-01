/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  allowedDevOrigins: [
    "https://shlokvaidya.vercel.app"
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

