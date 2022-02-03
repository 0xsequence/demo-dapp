const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const shared = require('./shared')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const AssetsByTypePlugin = require('webpack-assets-by-type-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const main = ['whatwg-fetch']

const vendor = [
//   'core-js/shim',
//   'global',
//   'history',
//   'react',
//   'react-dom',
//   'react-helmet',
//   'lodash',
  'ethers'
]

const sharedConfig = {
  context: process.cwd(), // to automatically find tsconfig.json
  plugins: [],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192000
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  stats: {
    warningsFilter: /export .* was not found in/
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
    },
    plugins: [new TsconfigPathsPlugin()]
  }
}

const clientConfig = {
  ...sharedConfig,
  target: 'web',
  entry: {
    main: [...main, './src/index.tsx'],
    'vendor': vendor
  },
  node: {
    fs: 'empty',
    net: 'empty',
    child_process: 'empty'
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    publicPath: '/',
    filename: '[name]-[chunkhash].js',
    chunkFilename: 'bundle.[name]-[chunkhash].js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          ecma: 5,
          ie8: false,
          safari10: false,
          compress: {
            dead_code: true,
            unused: true
          },
          output: {
            comments: false,
            beautify: false
          }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        // init: {
        //   name: 'init',
        //   chunks: 'initial',
        //   minChunks: 2
        // },

        // vendor: {
        //   test: /[\\/]node_modules[\\/]/,
        //   chunks: 'all',
        //   priority: -10
        // },

        // default: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true
        // }

        default: false
      }
    },
    runtimeChunk: false,
    noEmitOnErrors: true, // NoEmitOnErrorsPlugin
    concatenateModules: true // ModuleConcatenationPlugin
  },
  plugins: [
    ...sharedConfig.plugins,
    new ForkTsCheckerWebpackPlugin({
      async: false,
      memoryLimit: 2048,
      workers: 2,
      useTypescriptIncrementalApi: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.GITCOMMIT': JSON.stringify(process.env.GITCOMMIT),
      'process.env.APP_CONFIG': JSON.stringify('{}')
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html',
      publicPath: '',
      templateParameters: {
        gitcommit: process.env.GITCOMMIT
      }
    }),
    // new AssetsByTypePlugin({
    //   path: path.join(process.cwd(), 'dist/assets.json')
    // }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: '.stats/index.html'
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: 'src/public',
    //     to: '.'
    //   }
    // ])
  ]
}

module.exports = [
  // clientConfig, serverConfig
  clientConfig
]
