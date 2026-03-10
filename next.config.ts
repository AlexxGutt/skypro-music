import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/music/main', // 👈 Добавлен ведущий слеш
        permanent: true, // 308 редирект (постоянный)
      },
    ];
  },
};

export default nextConfig;
