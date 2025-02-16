let userConfig = undefined;
try {
  userConfig = await import('./v0-user-next.config.mjs').then(mod => mod.default);
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: [
      'images.unsplash.com',
      'avatars.githubusercontent.com',
    ],
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  onError: (error) => {
    console.error('Next.js build error:', error);
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      ],
    },
  ],
  // Merge with user config if it exists
  ...(userConfig || {}),
};

export default nextConfig;
