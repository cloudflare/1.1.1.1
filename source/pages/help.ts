import '../styles/base.styl'

import initInstructionPicker from './instruction-picker'

import uuidv4 from 'uuid/v4'

const uuid = uuidv4();

console.log(window.btoa('Join us and help build a better Internet https://cloudflare.com/careers?utm=1.1.1.1-DNS'))

interface ShareData {
  [key: string]: string
  myIPAddress: string
  datacenterConnectionSpeed: string
  datacenterLocation: string
  dnsResolverIP: string
  supportsDNSSEC: string
  supportsIPv6: string
}

const shareData = {} as ShareData

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

function getRefElement (ref: string) {
  return <HTMLElement> document.querySelector(`[data-ref="${ref}"]`)!
}

function setRef (ref: string, value: any) {
  const element = getRefElement(ref)

  switch (typeof value) {
    case 'undefined':
      element.textContent = '❌ Unable to check...'
      break
    case 'boolean':
      element.textContent = value ? 'Yes' : 'No'
      break
    default:
      element.textContent = value.toString()
  }
  element.classList.add('resolved')
  writeToShareData(ref, value)
}

function writeToShareData(ref: string, value: any) {
  switch (typeof value) {
    case 'boolean':
      shareData[ref] = value ? 'Yes' : 'No'
      break
    default:
      shareData[ref] = value.toString()
  }
  const element = getRefElement('shareUrl')
  element.textContent = window.location.href + '#' + btoa(JSON.stringify(shareData))
}

function readFromShareData() {
  const json = atob(window.location.hash.replace('#', ''))
  const obj = JSON.parse(json)

  for (let key in obj) {
    setRef(key, obj[key])
  }
}

const resolverTests: { [key: string]: string } = {
  isCf: `${uuid}.is-cf.cloudflareresolve.com`,
  isDot: `${uuid}.is-dot.cloudflareresolve.com`,
  isDoh: `${uuid}.is-doh.cloudflareresolve.com`,
  'resolverIp-1.1.1.1': '1.1.1.1',
  'resolverIp-1.0.0.1': '1.0.0.1',
  'resolverIp-2606:4700:4700::1111': 'ipv6b.cloudflare-dns.com',
  'resolverIp-2606:4700:4700::1001': 'ipv6a.cloudflare-dns.com'
}

async function init () {
  initInstructionPicker()

  // click to copy url
  getRefElement('shareUrl').onclick = function () {
    (this as HTMLInputElement).select()
    document.execCommand('copy')
    setTimeout(() => window.getSelection().removeAllRanges(), 100) // Flash selection

    getRefElement('shareUrlMessage').textContent = 'Copied URL to clipboard'
  }

  if (window.location.hash.length > 1) {
    readFromShareData()
    return
  }

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
    const resolverResponse = await fetch(`https://${uuid}.map.cloudflareresolve.com`)
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

  // Show share URL
  const debugURLSection = <HTMLElement>document.querySelector('.debug-url-section')!
  if (debugURLSection) {
    debugURLSection.classList.remove('hidden')
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
