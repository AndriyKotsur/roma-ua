import Page from '../classes/Page'
import LightBox from '../classes/LightBox/LightBox'

class Gallery extends Page{
    constructor(){
      super()
  
      this.init()
    }
  
    init(){
      this.lightbox = new LightBox({
        selector: '[data-modal="modalbox"]',
        lazyload: true,
        arrows: true,    
        counter: true,
        slideSpeed: 500,
      })
    }
  }

  new Gallery()