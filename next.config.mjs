/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/customizer",
        destination: "/profile/customize",
        permanent: true,
      },
      {
        source: "/map",
        destination: "/home",
        permanent: false,
      },
      {
        source: "/start",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
