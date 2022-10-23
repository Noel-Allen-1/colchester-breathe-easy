/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    secret: 'MollyCat was here 2022'
},
publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
        ? '/api' // development api
        : '/api' // production api
},
  images: {
    domains: ["res.cloudinary.com"],
  },
}

module.exports = nextConfig
