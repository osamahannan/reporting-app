const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = (env) => {
  const isProduction = !!env.production;
  return {
    entry: './src/index.tsx',
    mode: isProduction ? 'production' : 'development',
    devServer: {
      port: 3003,
      headers: { 'Access-Control-Allow-Origin': '*' },
      historyApiFallback: { index: '/index.html' },
      static: path.resolve(__dirname, 'public'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: isProduction ? '/' : 'auto',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'reporting',
        filename: 'remoteEntry.js',
        exposes: {
          './ReportDashboard': './src/ReportDashboard.tsx',
        },
        shared: {
          react: { singleton: true, eager: true, requiredVersion: '^18.2.0' },
          'react-dom': { singleton: true, eager: true, requiredVersion: '^18.2.0' },
          'react-dom/client': { singleton: true, eager: true, requiredVersion: '^18.2.0' },
          'react/jsx-runtime': { singleton: true, eager: true, requiredVersion: '^18.2.0' },
          'react-router-dom': { singleton: true, eager: true, requiredVersion: '^6.4.0' },
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
    stats: { errorDetails: true },
  };
};