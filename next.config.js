/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching: require('next-pwa/cache')
});

const { i18n } = require('./next-i18next.config');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    dirs: ['.']
  },
  images: { domains: ['play.pokemonshowdown.com'] },
  staticPageGenerationTimeout: 600,
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/pastes/vgc',
        destination: '/pastes/vgc/gen9vgc2023series1' // Update the path when a new VGC format is released
      },
      {
        source: '/usages',
        destination: '/usages/gen8spikemuthcup'
      }
    ];
  },
  i18n
  // compress: false,
  // webpack(webpackConfig) {
  //   return {
  //     ...webpackConfig,
  //     optimization: {
  //       minimize: false
  //     }
  //   };
  // }
};

module.exports = withBundleAnalyzer(withPWA(nextConfig));
