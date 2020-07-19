/* eslint @typescript-eslint/no-var-requires: 0 */
const path = require('path');
const { resolveTsAliases } = require('resolve-ts-aliases');
const ForkTSCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

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

    config.resolve.extensions = config.resolve.extensions.concat([
      '.ts',
      '.tsx',
    ]);
    config.module.rules.push({ test: /\.(ts|tsx)?$/, loader: 'ts-loader' });

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
    );

    const alias = resolveTsAliases(path.resolve('tsconfig.json'));

    config.resolve['alias'] = {
      ...alias,
      ...config.resolve['alias'],
    };

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
