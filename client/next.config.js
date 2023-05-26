/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_CLIENT_ID: process.env.SHOPIFY_ACCESS_TOKEN,
    GOOGLE_CLIENT_SECRET: process.env.SHOPIFY_STORE_API_URL,
    GOOGLE_OAUTH_REDIRECT_URL: process.env.BASE_API_URL,
    API_BASE_URL: process.env.API_BASE_URL
  },
  images: {
    domains: ['cdn.shopify.com'],
  },
}

module.exports = nextConfig
