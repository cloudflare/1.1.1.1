import fs from 'fs'
import { port } from '../source/utilities/routes'
import config from '../webpack.config'
const serve = require('webpack-serve')

serve({
  config,
  port,
//  http2: true,
//   https: {
//     key: fs.readFileSync('...key'),   // Private keys in PEM format.
//     cert: fs.readFileSync('...cert'), // Cert chains in PEM format.
//     // pfx: <String>,                    // PFX or PKCS12 encoded private key and certificate chain.
//     // passphrase: <String>              // A shared passphrase used for a single private key and/or a PFX.
// }
 })
