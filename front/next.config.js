/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`,
            },
        ]
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/posts',
                permanent: false,
            },
        ]
    },
}

module.exports = nextConfig
