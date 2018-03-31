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
import * as OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import { format as formatURL } from 'url'
import localeDefinitions from './source/utilities/i18n/lang'

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
  publicPath: '/',
  // publicPath: '',
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
      chunkFilename: '[id].css',
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      cache: true,
      parallel: true,
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    }),
    new OptimizeCSSAssetsPlugin()
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
        // {
        //   loader: 'html-loader',
        //   options: {
        //     minimize: htmlMinify,
        //     attrs: ['img:src', 'video:src']
        //   }
        // },
        {
          loader: 'pug-loader',
          options: {
            pretty: false
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

$.entry['site'] = ['./source/pages/index.ts']

const locales = [
  {
    path: '',
    code: 'en-US',
    label: 'English'
  },
  // {
  //   path: 'es/',
  //   code: 'es',
  //   label: 'Español'
  // },
  // {
  //   path: 'fr/',
  //   code: 'fr',
  //   label: 'Français'
  // },
  // {
  //   path: 'de/',
  //   code: 'de',
  //   label: 'Deutsch'
  // },
  // {
  //   path: 'zh-Hans/',
  //   code: 'zh-Hans',
  //   label: '简体中文'
  // },
  // {
  //   path: 'zh-Hant/',
  //   code: 'zh-Hant',
  //   label: '中國傳統的'
  // },
  // {
  //   path: 'ja-jp/',
  //   code: 'ja-jp',
  //   label: '日本語'
  // }
]

$.plugins.push(...locales.map((locale) => {
  return new HtmlWebpackPlugin({
    favicon: 'source/media/favicon.png',
    template: joinP('source/pages/index.pug'),
    filename: `${locale.path}index.html`,
    t: (key: string) => localeDefinitions[locale.code][key] || localeDefinitions['en-US'][key],
    locale,
    locales,
    formatURL,
    NODE_ENV: environment,
    title: '1.1.1.1 — the Internet’s Fastest, Privacy-First DNS Resolver',
    description: '✌️✌️ Browse a faster, more private internet.'
  })
}))

export default $
