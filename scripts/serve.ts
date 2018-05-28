import fs from 'fs'
import { port } from '../source/utilities/routes'
import config from '../webpack.config'
import { say } from 'cowsay'
import * as webpack from 'webpack'
import proxy = require('http-proxy-middleware')
const serve = require('webpack-serve')
const convert = require('koa-connect')

const compiler = webpack(config)
let notified = false

compiler.plugin('done', stats => {
  if (notified) return

  stats = stats.toJson()

  if (stats.errors && stats.errors.length > 0) {
    return console.log(stats.error)
  }
  console.log(say({ text: `http://localhost:${port}` }))
})

serve({
  compiler,
  port,
  logLevel: 'silent',
  logTime: false,
  add: (app: any, middleware: any, options: any) => {
    middleware.webpack()
    middleware.content()
    app.use(convert(proxy('/cdn-cgi/trace', {
      target: 'http://1.1.1.1/cdn-cgi/trace'
    })))
  }
})
