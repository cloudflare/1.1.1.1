import { port } from './source/utilities/routes'
import webpack, {
  DefinePlugin,
  NamedModulesPlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
  SourceMapDevToolPlugin
} from 'webpack'

// type Environmnt

const environment = (process.env.NODE_ENV || 'development') as webpack.Configuration['mode']
const path = require('path')
const joinP = path.join.bind(null, __dirname)
const fs = require('fs')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

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
  publicPath: '/',
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
  })
]

if (environment === 'development') {
  $.devtool = 'cheap-module-source-map'

  $.plugins.push(
    new NamedModulesPlugin(),
    // new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin()
  )
}

if (environment === 'production') {
  $.plugins.unshift(new CleanWebpackPlugin($.output.path))

  $.plugins.push(
    new SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
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
            attrs: false
          }
        },
        {
          loader: 'pug-html-loader',
          options: {
            pretty: false,
            data: {
              NODE_ENV: environment,
              // buildHash: git.short()
            }
          }
        }
      ]
    },
    {
      test: /\.styl$/,
      exclude,
      use: [
        {
          loader: 'style-loader',
          options: {
            sourceMap: true
          }
        },
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
  filename: `pages/index.html`,
  template: joinP('source/pages/index.pug')
}))

export default $
