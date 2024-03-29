/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'media.api-sports.io',
            port: '',
            pathname: '/football/teams/**',
          },
          {
            protocol: 'https',
            hostname: 'media.api-sports.io',
            port: '',
            pathname: '/football/leagues/**',
          },
        ],
    }
}

module.exports = nextConfig
