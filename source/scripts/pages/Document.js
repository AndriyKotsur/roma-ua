import Page from '../classes/Page'
import ShowMore from '../classes/ShowMore'

class Document extends Page {
    constructor() {
        super()

        this.init()
    }

    init() {
        this.showMore = new ShowMore({
            container: 'description',
            btn: 'extend'
        })
    }
}

new Document()