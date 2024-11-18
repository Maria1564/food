const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { default: axios } = require("axios");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const buildPath = path.resolve(__dirname, "dist");
const isDev = process.env.NODE_ENV === "development";
const srcPath =  path.join(__dirname, "src")

module.exports = {
  target: isDev ? "web" : "browserslist",
  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.s?css$/i,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: (resourcePath) => resourcePath.includes(".module."),
                localIdentName: isDev
                  ? "[path][name]__[local]"
                  : "[hash:base64]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: ['autoprefixer']
                }
            }
          },
          'sass-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg)/,
        type: 'asset',
        parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024
            }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[hash].[ext]',
                    outputPath: 'fonts/',
                },
            },
        ],
    },
    ],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html"),
    }),
    ...(isDev ? [] : [new MiniCssExtractPlugin({
      filename: `[name].[contenthash].css`
  })]),
    isDev && new ReactRefreshPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ].filter(Boolean),
  resolve: {
    extensions: ['.tsx', '.jsx', '.js', '.ts'],
    alias: {
      components: path.join(srcPath, "components"),
      layout: path.join(srcPath, "layout"),
      store: path.join(srcPath, "store"),
      axiosConfig: path.join(srcPath, "axiosConfig"),
      utils: path.join(srcPath, "utils"),
      types: path.join(srcPath, "types"),
      styles: path.join(srcPath, "styles")
    }
  },
  devServer: {
    host: "127.0.0.1",
    port: 9000,
    hot: true,
    historyApiFallback: true
  },
};
