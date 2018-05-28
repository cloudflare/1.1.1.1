import '../styles/base.styl'

import { logoBanner } from './console'
import initInstructionPicker from './instruction-picker'
const mapTheme = require('./google-map-theme.json')

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

async function init () {
  initInstructionPicker()

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

  setRef('myIPAddress', traceInfo.ip)
  setRef('datacenterConnectionSpeed', `${traceEnd}ms`)
  setRef('datacenterLocation', `Approximate location: ${traceInfo.colo} Airport`)

  let resolverInfo = {} as ResolverInfo

  try {
    const resolverResponse = await fetch(`https://${uuidv4()}.map.cloudflareresolve.com`)
    resolverInfo = await resolverResponse.json()
  } catch (error) {
    console.log('Resolver error:', error)
  }

  setRef('dnsResolverIP', resolverInfo.ip)
  setRef('supportsDNSSEC', resolverInfo.dnssec)

  const setupSection = <HTMLElement>document.getElementById('setup-instructions')!

  try {
    const ipV6Response = await fetch('https://[2606:4700:4700::1111]/resolvertest')
    setRef('supportsIPv6', ipV6Response.ok)
  } catch (error) {
    setRef('supportsIPv6', false)
    console.log('IPv6 Error', error)
  }

  if (resolverInfo.isp.name.toLowerCase() !== 'cloudflare') {
    setupSection.classList.remove('help-initial-hidden')
  }

  // interface GeocoderResultLiteral extends google.maps.GeocoderResult {
  //   location: google.maps.LatLngBoundsLiteral;
  // }

  // let geocoderInfo: {
  //   results: GeocoderResultLiteral[]
  //   status: google.maps.GeocoderStatus
  // }

  // try {
  //   const geocoderResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=IATA+${traceInfo.colo}&key=AIzaSyCuebBICxH3FZeML7_xQVszyKm_sswAcac`)

  //   geocoderInfo = await geocoderResponse.json()
  // } catch (error) {
  //   console.log('Maps error:', error)
  // }


  // if (geocoderInfo!.status === google.maps.GeocoderStatus.OK) {
  //   const [result] = geocoderInfo!.results

  //   const [city, stateAndZip = ''] = result.formatted_address.split(', ')
  //   const [state] = stateAndZip.split(' ')
  //   const name = state ? `${city}, ${state}` : city
  //   setRef('datacenterLocation', name)

  //   const mapEl = document.getElementById('datacenter-map')!
  //   mapEl.classList.add('resolved')

  //   const googleMap = new google.maps.Map(mapEl, {
  //       center: result.geometry.location,
  //       styles: mapTheme.minimal,
  //       disableDefaultUI: true,
  //       disableDoubleClickZoom: true,
  //       draggable: true,
  //       mapTypeControl: false,
  //       panControl: false,
  //       scaleControl: false,
  //       scrollwheel: false,
  //       zoomControl: false,
  //       zoom: 9
  //   })

  //   const marker = new google.maps.Marker({
  //     map: googleMap,
  //     position: result.geometry.location,
  //     draggable: false
  //   })
  // }

  console.debug({traceInfo, resolverInfo})
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
