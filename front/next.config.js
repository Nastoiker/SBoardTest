/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [process.env.NEXT_PUBLIC_BACKEND_URL],
        //   domains: ['localhost'],

    },
    experimental: {
        appDir: true,
    },
    reactStrictMode: true,

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
