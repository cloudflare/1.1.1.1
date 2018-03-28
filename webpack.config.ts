import { port } from './source/utilities/routes'
import webpack, {
  DefinePlugin,
  NamedModulesPlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
  SourceMapDevToolPlugin
} from 'webpack'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as CleanWebpackPlugin from 'clean-webpack-plugin'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const environment = (process.env.NODE_ENV || 'development') as webpack.Configuration['mode']
const path = require('path')
const joinP = path.join.bind(null, __dirname)
const fs = require('fs')

const exclude = /node_modules/

interface CustomConfiguration extends webpack.Configuration {
  entry: {
    [index: string]: string[]
  }
  plugins: webpack.Plugin[]
}

const $: CustomConfiguration = {
  mode: environment,
  entry: {},
  plugins: []
}

$.resolve = {
  extensions: ['.js', '.json', '.ts', '.tsx'],
  modules: [joinP('source'), joinP('node_modules')]
}

$.output = {
  // publicPath: '/',
  publicPath: '',
  path: joinP('build'),
  filename: '[name].js',
  library: '[name]',
  libraryTarget: 'umd'
}

export interface BundleDefinition {
  [index: string]: string | object,
}

const bundleDefinitions: BundleDefinition = {
  'process.env': {
    NODE_ENV: JSON.stringify(environment)
  }
}

$.plugins = [
  new DefinePlugin(bundleDefinitions),
  new ForkTsCheckerWebpackPlugin({
    tsconfig: joinP('source/tsconfig.json')
  }),
  new CopyWebpackPlugin([{
    to: 'media',
    from: joinP('source/media')
  }])
]

if (environment === 'development') {
  $.devtool = 'cheap-module-source-map'

  $.plugins.push(
    new NamedModulesPlugin(),
    // new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin()
  )
}

let styleLoader = {
  loader: 'style-loader',
  options: {
    sourceMap: true
  }
}

if (environment === 'production') {
  styleLoader = MiniCssExtractPlugin.loader

  $.plugins.unshift(new CleanWebpackPlugin($.output.path!))

  $.plugins.push(
    new SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
    // new UglifyJsPlugin()
  )
}

let htmlMinify: boolean | any = false

if (environment !== 'development') {
  htmlMinify = {
    html5: true,
    minifyJS: true,
    minifyCSS: true,
    collapseWhitespace: true,
    preserveLineBreaks: false,
    removeComments: false
  }
}

$.module = {
  rules: [
    {
      test: /\.tsx?$/,
      exclude,
      use: [
        // {loader: 'babel-loader'},
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true, // Type checking done via plugin.
            configFile: joinP('source/tsconfig.json')
          }
        }
      ]
    },
    { // Generic Pug templates
      test: /\.pug$/,
      exclude,
      use: [
        {
          loader: 'html-loader',
          options: {
            minimize: htmlMinify,
            attrs: ['img:src', 'video:src']
          }
        },
        {
          loader: 'pug-html-loader',
          options: {
            pretty: false,
            data: {
              NODE_ENV: environment,
              title: 'Cloudflare DNS Resolver · 1.1.1.1',
              description: 'Browse a faster, more private internet.'
            }
          }
        }
      ]
    },
    {
      test: /\.(png|jpg|gif|mp4)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            // name: '[path][name].[ext]'
          }
        }
      ]
    },
    {
      test: /\.svg$/,
      loader: 'svg-inline-loader',
      exclude
    },
    {
      test: /\.styl$/,
      exclude,
      use: [
        styleLoader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'stylus-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    }
  ]
}

const hotReloadEntries = [
  `webpack-dev-server/client?http://0.0.0.0:${port}`,
  'webpack/hot/only-dev-server'
]

// $.entry['site'] = [...hotReloadEntries, './source/pages/index.ts']
$.entry['site'] = ['./source/pages/index.ts']

$.plugins.push(new HtmlWebpackPlugin({
  favicon: 'source/media/favicon.png',
  template: joinP('source/pages/index.pug'),
  filename: 'index.html'
}))

export default $
