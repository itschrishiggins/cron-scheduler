/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/cron-scheduler' : '',
  assetPrefix: isProd ? '/cron-scheduler/' : '',
};

module.exports = nextConfig;
