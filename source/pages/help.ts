import '../styles/base.styl'

import initInstructionPicker from './instruction-picker'

import uuidv4 from 'uuid/v4'

console.log(window.btoa('Join us and help build a better Internet https://cloudflare.com/careers?utm=1.1.1.1-DNS'))

interface TraceInfo {
  [index: string]: string
  fl: string
  h: string
  ip: string
  ts: string
  visit_scheme: string
  uag: string
  colo: string
  spdy: string
  http: string
  loc: string
}

interface ResolverInfo {
  ip: string
  ip_version: number
  protocol: string
  dnssec: boolean
  edns: number
  client_subnet: number
  qname_minimization: boolean
  isp: {
    asn: number
    name: string
  }
}


function setRef (ref: string, value: any) {
  const element = <HTMLElement>document.querySelector(`[data-ref="${ref}"]`)!

  switch (typeof value) {
    case 'undefined':
      element.textContent = '❌ Error. See developer console.'
      break
      case 'boolean':
      element.textContent = value ? 'Yes' : 'No'
      break
    default:
      element.textContent = value.toString()

  element.classList.add('resolved')
  }
}

const resolverIps: string[] = ['1.1.1.1', '1.0.0.1', '2606:4700:4700::1111', '2606:4700:4700::1001']

const resolverTests = {
  isCf: 'is-cf.cloudflareresolve.com',
  isDot: 'is-dot.cloudflareresolve.com',
  isDoh: 'is-doh.cloudflareresolve.com'
} as { [key: string]: string }

resolverIps.forEach(ip => {
  const v6 = ip.includes(':')
  resolverTests[`resolverIp-${ip}`] = `${v6 ? '[' : ''}${ip}${v6 ? ']' : ''}`
})

async function init () {
  initInstructionPicker()

  for (let ref in resolverTests) {
    const host = resolverTests[ref]
    try {
      const res = await fetch(`https://${host}/resolvertest`)
      setRef(ref, res.ok)
    } catch (error) {
      setRef(ref, false)
    }
  }

  const traceInfo = {} as TraceInfo
  let traceEnd: number
  const traceStart = Date.now()

  try {
    const traceResponse = await fetch('/cdn-cgi/trace')
    traceEnd = Date.now() - traceStart
    const traceContent = await traceResponse.text()

    traceContent
      .split('\n')
      .filter(isPresent => isPresent)
      .map(line => line.split('='))
      .forEach(pair => traceInfo[pair[0]] = pair[1])
  } catch (error) {
    traceEnd = Date.now() - traceStart
    console.log('Trace error:', error)
  }

  setRef('datacenterLocation', traceInfo.colo)

  let resolverInfo = {} as ResolverInfo

  try {
    const resolverResponse = await fetch(`https://${uuidv4()}.map.cloudflareresolve.com`)
    resolverInfo = await resolverResponse.json()
  } catch (error) {
    console.log('Resolver error:', error)
  }

  setRef('ispName', resolverInfo.isp.name)
  setRef('ispAsn', resolverInfo.isp.asn)

  const setupSection = <HTMLElement>document.getElementById('setup-instructions')!

  if (resolverInfo.isp.name.toLowerCase() !== 'cloudflare') {
    setupSection.classList.remove('help-initial-hidden')
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
