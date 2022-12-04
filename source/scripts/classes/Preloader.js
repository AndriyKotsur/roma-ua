import App from './App/App'

class Preloader {
  constructor({
    ...options
  }) {
    if (!options) {
      console.error('Please add a valid css selectors')
    } else if (typeof options.preloader !== 'string') {
      console.error(options.selector, `is not a string but a(n) ${typeof options.selector}`)
    } else {
      this.app = new App()
      this.preloaderBox = document.getElementById(options.preloader)

      this.events()
    }
  }

  events() {
    this.app.body.lockScroll(true)

    window.addEventListener('load', () => {
      setTimeout(() => {
        this.preloaderBox.classList.add('disabled');
        this.app.body.lockScroll(false)
      }, 500)
    })
  }
}

export default Preloader