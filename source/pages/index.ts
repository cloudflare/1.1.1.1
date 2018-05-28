import '../styles/base.styl'

import SweetScroll from 'sweet-scroll'
import { logoBanner } from './console'
import initInstructionPicker from './instruction-picker'

function isElementPartiallyInViewport (element: HTMLElement) {
  const { left, top, height, width } = element.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const windowWidth = window.innerWidth || document.documentElement.clientWidth

  const inViewVertically = top <= windowHeight && top + height >= 0
  const inViewHorizontally = left <= windowWidth && left + width >= 0

  return inViewVertically && inViewHorizontally
}

function ref(ref: string): HTMLElement {
  return <HTMLElement>document.querySelector(`[data-ref="${ref}"]`)!
}

console.log(logoBanner)
console.log(window.btoa('Join us and help build a better Internet https://cloudflare.com/careers?utm=1.1.1.1-DNS'))

function init () {
  const scroller = new SweetScroll() // Initialized for its DOM side effects.

  const $el = {
    slideshow: ref('slideshow'),
    setupSection: ref('setup'),
    statsChart: ref('statsChart'),
    languageSelector: ref('languageSelector')
  }

  document.addEventListener('click', (event) => {
    if (event.target === $el.languageSelector || $el.languageSelector.contains(<Node>event.target)) {
      $el.languageSelector.classList.toggle('dropdown-open')
    } else {
      $el.languageSelector.classList.toggle('dropdown-open', false)
    }
  })

  initInstructionPicker()

  const slideCount = $el.slideshow.querySelectorAll('.background-slide').length

  window.setInterval(() => {
    const slideIndex = parseInt($el.slideshow.dataset.activeSlide!, 10)

    $el.slideshow.dataset.activeSlide = (slideIndex > slideCount - 1 ? 1 : slideIndex + 1).toString()
  }, 6000)


  let hasAnimated = false

  function animateChart () {
    if (hasAnimated || !isElementPartiallyInViewport($el.statsChart)) return

    setTimeout(() => {
      $el.statsChart.style.opacity = '1'
    }, 400)

    Array.prototype.forEach.call($el.statsChart.querySelectorAll('.bar-chart'), (barChart: HTMLElement, index: number) => {
      const innerBar = barChart.querySelector('.bar-chart-fill') as HTMLElement

      innerBar.style.width = '0'

      setTimeout(() => {
        innerBar.style.width = `${barChart.dataset.total}%`
      }, 400 + (index * 100))
    })
    hasAnimated = true
  }

  setTimeout(animateChart, 400)

  document.addEventListener('scroll', animateChart)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
