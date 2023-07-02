/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_OAUTH_REDIRECT_URL:process.env.NODE_ENV === 'development' 
      ? process.env.GOOGLE_OAUTH_REDIRECT_URL_DEV
      : process.env.GOOGLE_OAUTH_REDIRECT_URL_PROD,
    API_BASE_URL: process.env.NODE_ENV === 'development' 
      ? process.env.API_BASE_URL_DEV
      : process.env.API_BASE_URL_PROD
  },
  images: {
    domains: ['cdn.shopify.com'],
  },
}

module.exports = nextConfig
