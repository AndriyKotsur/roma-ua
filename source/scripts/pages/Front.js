import Page from '../classes/Page'
import Poll from '../classes/Poll'
import Support from '../classes/Support/Support'
import Splide from '@splidejs/splide'

class Front extends Page {
  constructor() {
    super()
    this.splide = document.getElementById('splide')
    this.init()
  }

  init() {
    this.splide ? new Splide('#splide', splideConf).mount() : null

    this.poll = new Poll({
      form: 'poll',
      poleItems: '.poll__item',
      voteBtn: 'poll-vote',
      container: '.poll'
    })
  }
}

const splideConf = {
  rewind: false,
  pagination: true,
  arrows: false,
  perPage: 3,
  gap: 110,
  breakpoints: {
    1024: {
      perPage: 2,
      gap: 40
    },
    767: {
      width: '100%',
      perPage: 1,
      gap: 20
    },
  }
}

new Front()