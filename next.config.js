/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
    // GitHub Pages deployment configuration:
    output: 'export',
    basePath: '/portfolio',
    assetPrefix: '/portfolio/',
};

module.exports = nextConfig;
