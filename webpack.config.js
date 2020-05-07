const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'example/src/app.tsx'),
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, '..', 'dist'),
    pathinfo: true,
  },
  devtool: 'eval-source-map',
  performance: {
    hints: 'warning',
  },
  module: {
    noParse(content) {
      return /jquery/.test(content);
    },
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              "@babel/transform-runtime",
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-syntax-dynamic-import"
            ]
          }
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'static/img/',
          },
        }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'static/fonts/',
          },
        }],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              hmr: true,
            },
          },
          'css-loader'
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              hmr: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: [
                require('autoprefixer'),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
      },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '..', 'src'),
    ],
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
  },
  target: 'web',
  externals: {
    jquery: 'jQuery',
  },
  performance: {
    maxAssetSize: 1024 * 500,
  },
  devServer: {
    contentBase: path.join(__dirname, 'example/dist'),
    // 域名
    host: '127.0.0.1',
    // 端口号
    port: 3000,
    historyApiFallback: true,
    inline: true,
    hot: true,
    // 自动打开浏览器
    // open: true,
    compress: true,
    proxy: {
      '/api/': {
        target: '/api/',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'React UI',
      filename: 'index.html',
      template: './example/src/index.html',
      hash: true,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
