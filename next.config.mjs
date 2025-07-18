import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com"],
  },
  // Configuración moderna sin turbopack
  webpack: (config, { isServer }) => {
    // Configuración de alias
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src")
    };
    
    return config;
  },
  // Opciones modernas recomendadas
  experimental: {
    optimizePackageImports: ['@components']
  }
};

export default nextConfig;
