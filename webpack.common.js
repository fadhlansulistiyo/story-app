const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const htmlWebpackPluginConfig = {
  meta: {
    viewport:
      'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
    'theme-color': '#ec0075',
  },
  templateParameters: {
    brandName: 'Story App',
  },
};

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/js/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader',
      },
    ],
  },
  plugins: [
    // Home
    new HtmlWebpackPlugin({
      title: 'Home',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/pages/index.html'),
      ...htmlWebpackPluginConfig,
    }),

    // Create
    new HtmlWebpackPlugin({
      title: 'Create',
      filename: 'create/create.html',
      template: path.resolve(__dirname, 'src/pages/create/create.html'),
      ...htmlWebpackPluginConfig,
    }),

    // Profile Page
    new HtmlWebpackPlugin({
      title: 'Profile',
      filename: 'profile/profile.html',
      template: path.resolve(__dirname, 'src/pages/profile/profile.html'),
      ...htmlWebpackPluginConfig,
    }),

    // Login Page
    new HtmlWebpackPlugin({
      title: 'Login',
      filename: 'auth/login.html',
      template: path.resolve(__dirname, 'src/pages/auth/login.html'),
      ...htmlWebpackPluginConfig,
    }),

    // Register Page
    new HtmlWebpackPlugin({
      title: 'Register',
      filename: 'auth/register.html',
      template: path.resolve(__dirname, 'src/pages/auth/register.html'),
      ...htmlWebpackPluginConfig,
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),

    new CleanWebpackPlugin(),
  ],
};
