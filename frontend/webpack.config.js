const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/',
  },
  devServer: {
    port: 8080,
    contentBase: './public',
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      modules: `${__dirname}/node_modules`,
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.css',
    }),
    new Dotenv({
      path: './.env',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: {
          loader: 'eslint-loader',
          options: {
            emitWarning: true,
            configFile: './.eslintrc.json',
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: '10',
                  },
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};
