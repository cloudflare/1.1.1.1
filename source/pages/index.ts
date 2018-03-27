import '../styles/base.styl'

import platform from 'platform'
import SweetScroll from 'sweet-scroll'
import { logoBanner } from './console'

interface DeviceInfo {
  id: string
  label: string
}

const deviceInfo: { [index: string]: DeviceInfo } = {
  'Windows': {
    label: 'Windows',
    id: 'windows'
  },
  'OS X': {
    label: 'MacOS',
    id: 'mac-os'
  },
  'iOS': {
    label: 'iOS',
    id: 'iphone'
  },
  'Android': {
    label: 'Android',
    id: 'android'
  }
}

function ref(ref: string): HTMLElement {
  return <HTMLElement>document.querySelector(`[data-ref="${ref}"]`)!
}

document.addEventListener('DOMContentLoaded', () => {
  // console.log(logoBanner)
  // console.log(window.btoa('Join Cloudflare and help build a better Internet https://cloudflare.com/careers?utm=1.1.1.1-DNS'))

  const scroller = new SweetScroll()

  const $el = {
    instructionPicker: ref('instructionPicker'),
    instructionChoices: Array.prototype.slice.call(ref('instructionPicker').querySelectorAll('.choice')),
    deviceLabel: ref('deviceLabel'),
    slideshow: ref('slideshow'),
    setupSection: ref('setup')
    // instructionsContent: ref('instructionsContent'),
    // setupButton: ref('setupButton'),
    // infoButton: ref('infoButton')
  }

  // $el.infoButton.addEventListener('click', )

  function chooseInstructions (platform: string) {
    $el.instructionChoices.forEach((choice: HTMLElement) => {
      choice.classList.toggle('selected', choice.dataset.platform === platform)
    })

    $el.setupSection.dataset.platform = platform
    $el.deviceLabel.textContent = $el.deviceLabel.dataset.label!.replace('{{device}}', device.label)
  }

  $el.instructionChoices.forEach((choice: HTMLElement) => {
    choice.addEventListener('click', chooseInstructions.bind(null, choice.dataset.platform))
  })

  let device: DeviceInfo = deviceInfo['OS X']

  if (platform.os && platform.os.family && deviceInfo.hasOwnProperty(platform.os.family)) {
    device = deviceInfo[platform.os.family]
  }


  chooseInstructions(device.id)

  // const slideCount = $el.slideshow.querySelectorAll('.background-slide').length

  // window.setInterval(() => {
  //   const slideIndex = parseInt($el.slideshow.dataset.activeSlide!, 10)

  //   $el.slideshow.dataset.activeSlide = (slideIndex > slideCount - 1 ? 1 : slideIndex + 1).toString()
  // }, 3000)
})
