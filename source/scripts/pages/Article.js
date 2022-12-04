import Page from '../classes/Page'
import ScrollToTarget from '../classes/ScrollToTarget'
import BackToTop from '../classes/BackToTop'
import Comment from '../classes/Сomment/Comment'

class Article extends Page {
    constructor() {
        super()

        this.init()
    }

    init() {
        this.scroll = new ScrollToTarget({
            btns: '.anchor'
        })

        this.back = new BackToTop({
            btn: 'backToTop',
            anchor: 'aside'
        })

        this.comment = new Comment({
            form: 'comment-form',
            inputName: 'comment-name',
            inputTextarea: 'comment-text',
            counter: 'comment-counter',
            btn: 'comment-btn',
            loader: 'loader',
            close: 'loader-close'
        })
    }
}

new Article()