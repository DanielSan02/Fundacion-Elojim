import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com"],
  },
  // Configuración para Turbopack (opcional, según necesidades)
  experimental: {
    turbo: {
      resolveAlias: {
        "@": path.resolve(__dirname, "src"), // Alias para Turbopack
      },
    },
  },
  // Elimina webpack si solo usas Turbopack en desarrollo
  // (Opcional: mantenerlo para compatibilidad con `next build`)
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
};

export default nextConfig;