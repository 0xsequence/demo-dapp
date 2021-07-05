const path = require('path')
const webpack = require('webpack')
const shared = require('./shared')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

let dist = process.env.DIST
if (!dist || dist === '') {
  dist = 'local'
}

process.env.GITCOMMIT = 'dev'

const appConfig = {}

const main = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://0.0.0.0:4000',
  'webpack/hot/only-dev-server',
  'whatwg-fetch',
  './src/index.tsx'
]
// const vendor = shared.vendorEntry({
//   mainModules: main,
//   modulesToExclude: ['']
// })

module.exports = {
  context: process.cwd(), // to automatically find tsconfig.json
  entry: {
    main: main,
    // vendor: vendor
  },
  node: {
    fs: "empty",
    net: "empty",
    child_process: "empty"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/'
  },
  optimization: {
    namedModules: true,
    namedChunks: true,
    // removeAvailableModules: false,
    // removeEmptyChunks: false,
    // splitChunks: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      watch: ['./src'] // optional but improves performance (fewer stat calls)
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.GITCOMMIT': JSON.stringify(process.env.GITCOMMIT),
      'process.env.APP_CONFIG': `'${JSON.stringify(appConfig)}'`
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html',
      templateParameters: {
        gitcommit: ''
      }
    })
    // new BundleAnalyzerPlugin(),
  ],
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
        exclude: path.resolve(process.cwd(), 'node_modules'),
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
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.png', '.jpg'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '~': path.join(process.cwd(), 'src')
    },
    plugins: [new TsconfigPathsPlugin()]
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 4000,
    open: false,
    hot: true,
    historyApiFallback: true,
    stats: 'errors-only',
    disableHostCheck: true,
    contentBase: path.resolve(process.cwd(), 'src/public'),
    publicPath: '/'
  }
}
