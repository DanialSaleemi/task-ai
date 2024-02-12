/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        return [
            {
                source: '/api/:path*',
                destination: 
                    process.env.NODE_ENV === "development"
                    ? 'http://localhost:8000/api/:path*'
                    : '/api/',
            },
        ];
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    {key: "Access-Control-Allow-Credentials", value: "true"},
                    {key: "Access-Control-Allow-Origin", value: "*"},
                    {key: "Access-Control-Allow-Methods", value: "*"},
                    {key: "Access-Control-Allow-Headers", value: "x-CSRF-Token, X-Requested-with, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date,  X-Api-Version"},
                ]
            }
        ]
    }
};

export default nextConfig;
