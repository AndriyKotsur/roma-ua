import Page from '../classes/Page'
import BackToTop from '../classes/BackToTop'

class OfferAgreement extends Page {
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

new OfferAgreement()