module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },

  webpack(config, { isServer }) {
    return config;
  },

  env: {
    NEXT_PUBLIC_SPOONACULAR_API_KEY: '4e1ab513731c4ffeaa22089bd7a2d2a3',
    FAST_REFRESH: 'false',
    CHOKIDAR_USEPOLLING: 'true',
    WATCHPACK_POLLING:'true',
  },
};
