/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: `/${process.env.NEXT_PUBLIC_IMAGEKIT_ID}/**`,
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/uc**",
      },
    ],
  },
  serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
