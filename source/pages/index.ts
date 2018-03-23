import '../styles/base.styl'

import platform from 'platform'

function elementByRef(ref: string): HTMLElement {
  return <HTMLElement>document.querySelector(`[data-ref="${ref}"]`)!
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello world! 🚀')
  console.log(platform)

  const deviceLabel = elementByRef('deviceLabel')
  deviceLabel.textContent = deviceLabel.textContent!.replace('{{device}}', platform.product || 'device')

  const slideshow = elementByRef('slideshow')
  const slideCount = slideshow.querySelectorAll('.background-slide').length

  window.setInterval(() => {
    const slideIndex = parseInt(slideshow.dataset.activeSlide!, 10)

    slideshow.dataset.activeSlide = (slideIndex > slideCount - 1 ? 1 : slideIndex + 1).toString()
  }, 3000)
})
