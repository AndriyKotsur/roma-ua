import Page from '../classes/Page'
import Poll from '../classes/Poll'

class Videos extends Page {
    constructor() {
        super()

        this.init()
    }

    init() {
        this.poll = new Poll({
            form: 'poll',
            poleItems: '.poll__item',
            voteBtn: 'poll-vote',
            container: '.poll'
        })
    }
}

new Videos()