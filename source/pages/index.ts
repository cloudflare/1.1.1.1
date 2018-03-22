import '../styles/base.styl'

import platform from 'platform'

document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello world! 🚀')
  console.log(platform)


  const slideshow = <HTMLElement>document.querySelector('[data-ref="slideshow"]')!
  const slideCount = slideshow.querySelectorAll('.background-slide').length

  window.setInterval(() => {
    const slideIndex = parseInt(slideshow.dataset.activeSlide!, 10)

    slideshow.dataset.activeSlide = (slideIndex > slideCount - 1 ? 1 : slideIndex + 1).toString()
  }, 3000)
})
