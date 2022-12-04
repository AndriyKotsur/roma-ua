import Page from '../classes/Page'
import Expander from '../classes/Expander/Expander'
import Support from '../classes/Support/Support'

class Donate extends Page {
    constructor() {
        super()

        this.init()
    }

    init() {
        this.expander = new Expander({
            target: '.point'
        })

        this.support = new Support({
            btns: '.donate-btn',
            loader: 'loader',
            close: 'loader-close'
        })
    }
}

new Donate()