/** @type {import('next').NextConfig} */
const isStaticExport = process.env.STATIC_EXPORT === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  ...(isStaticExport
    ? { output: 'export', trailingSlash: true, basePath, assetPrefix: basePath }
    : {}),
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
