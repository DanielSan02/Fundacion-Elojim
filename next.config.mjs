/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com"],
      },
      experimental: {
        appDir: true,
      },
      webpack: (config) => {
        config.resolve.alias = {
          ...config.resolve.alias,
          "@": path.resolve(__dirname, "src"),
        }
        return config
      },
};

export default nextConfig;

