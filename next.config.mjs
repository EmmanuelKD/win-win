/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };
        return config;
    },
    swcMinify: false,
    modularizeImports: {
        '@mui/icons-material': {
            transform: '@mui/icons-material/{{member}}'
        }
    },
    env: {
        OM_RETURN_URL: process.env.OM_RETURN_URL,
        OM_NOTIFICATION_URL: process.env.OM_NOTIFICATION_URL,
        OM_CANCELLATION_URL: process.env.OM_CANCELLATION_URL,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**'
            }
        ]
    }
};

export default nextConfig;

