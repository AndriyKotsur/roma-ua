import smoothScrollToTarget from '../utils/scroll'

class BackToTop {
  constructor({
    ...options
  }) {
    if (!options) {
      console.error('Please add a valid css selectors')
    } else if (typeof options.anchor !== 'string' && typeof options.btn !== 'string') {
      console.error(options.selector, `is not a string but a(n) ${typeof options.selector}`)
    } else {
      this.btn = document.getElementById(options.btn)
      this.target = document.querySelector('.header')

      this.events()
    }
  }

  events() {
    window.addEventListener('scroll', () => {
      this.checkPosition(this.anchor) ? this.show() : this.hide()
    })

    this.btn.addEventListener('click', () => {
      this.handleClick()
    })
  }

  checkPosition(el) {
    let flag = false
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop

    if (scrollTop > 0) {
      flag = true
    }
    return flag
  }

  handleClick() {
    smoothScrollToTarget(this.target, 0)
  }

  show() {
    this.btn.classList.add('active')
  }

  hide() {
    this.btn.classList.remove('active')
  }
}

export default BackToTop