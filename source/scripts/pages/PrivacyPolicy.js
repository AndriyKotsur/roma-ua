import Page from '../classes/Page'
import BackToTop from '../classes/BackToTop'

class PrivacyPolicy extends Page {
  constructor() {
    super()

    this.init()
  }

  init() {
    this.back = new BackToTop({
      btn: 'backToTop'
    })
  }
}

new PrivacyPolicy()