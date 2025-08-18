/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "your-cdn.com","https://picsum.photos"], // allow remote images
  },
}

export default nextConfig;
