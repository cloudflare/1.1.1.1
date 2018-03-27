import '../styles/base.styl'

import platform from 'platform'
import SweetScroll from 'sweet-scroll'
import { logoBanner } from './console'

function elementByRef(ref: string): HTMLElement {
  return <HTMLElement>document.querySelector(`[data-ref="${ref}"]`)!
}

document.addEventListener('DOMContentLoaded', () => {
  console.log(logoBanner)
  console.log(window.btoa('Join Cloudflare and help build a better Internet https://cloudflare.com/careers?utm=1.1.1.1-DNS'))
  const scroller = new SweetScroll()

  const deviceLabel = elementByRef('deviceLabel')
  deviceLabel.textContent = deviceLabel.textContent!.replace('{{device}}', platform.product || 'device')

  const slideshow = elementByRef('slideshow')
  const slideCount = slideshow.querySelectorAll('.background-slide').length

  window.setInterval(() => {
    const slideIndex = parseInt(slideshow.dataset.activeSlide!, 10)

    slideshow.dataset.activeSlide = (slideIndex > slideCount - 1 ? 1 : slideIndex + 1).toString()
  }, 3000)
})
