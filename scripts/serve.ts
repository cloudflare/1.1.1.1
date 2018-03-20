import fs from 'fs'
import { port } from '../source/utilities/routes'
import config from '../webpack.config'
import { say } from 'cowsay'
import * as webpack from 'webpack'
const serve = require('webpack-serve')

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
  logTime: false
//  http2: true,
//   https: {
//     key: fs.readFileSync('...key'),   // Private keys in PEM format.
//     cert: fs.readFileSync('...cert'), // Cert chains in PEM format.
//     // pfx: <String>,                    // PFX or PKCS12 encoded private key and certificate chain.
//     // passphrase: <String>              // A shared passphrase used for a single private key and/or a PFX.
// }
})
