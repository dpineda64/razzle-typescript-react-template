/* eslint @typescript-eslint/no-var-requires: 0 */
const path = require('path');
const { resolveTsAliases } = require('resolve-ts-aliases');
const ForkTSCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const PwaManifest = require('webpack-pwa-manifest');

module.exports = {
  modify: (defaultConfig) => {
    const config = Object.assign({}, defaultConfig);

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      include: path.resolve(__dirname, 'src/graphql'),
      exclude: /node_modules/,
      use: [
        {
          loader: 'graphql-tag/loader',
        },
      ],
    });

    config.module.rules
      .find((conf) => conf.loader && conf.loader.includes('file-loader'))
      .exclude.push(/\.(graphql|gql)/);

    config.module.rules.push({ test: /\.(ts|tsx)?$/, loader: 'ts-loader' });

    config.resolve.extensions.push('.ts', '.tsx');

    config.plugins.push(
      new ForkTSCheckerWebpackPlugin({
        eslint: {
          files: './src/**/*.{ts,tsx,js,jsx}',
          enabled: true,
        },
        typescript: {
          configFile: path.resolve('tsconfig.json'),
        },
      }),
      new PwaManifest({
        start_url: 'http://localhost:3000?pwa',
        name: 'Razzle Template',
        fingerprints: false,
        publicPath: '/manifest.json',
      }),
    );

    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new WorkboxPlugin.InjectManifest({
          swSrc: './src/service-worker.ts',
          exclude: ['server.js', /\.hot-update.*$/],
        }),
      );
    }

    const alias = resolveTsAliases(path.resolve('tsconfig.json'));

    config.resolve['alias'] = {
      ...alias,
      ...config.resolve['alias'],
    };

    return config;
  },
};
