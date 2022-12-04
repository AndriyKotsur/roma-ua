import smoothScrollToTarget from '../utils/scroll'

class ScrollToTarget {
    constructor({
        ...options
    }) {
        this.btns = document.querySelectorAll(options.btns)
        this.pageHash = this.pageHash = location.hash ? location.hash : ''

        this.events()
    }

    events() {
        if (this.btns.length > 0) {
            this.btns.forEach((elem) => {
                elem.addEventListener('click', (e) => {
                    this.pageHash = elem.hash

                    document.querySelector(this.pageHash) ? e.preventDefault() : ''
                    if (this.pageHash) {
                        history.pushState(null, null, this.pageHash)

                        if (elem.getAttribute('href')) {
                            smoothScrollToTarget(document.querySelector(this.pageHash), -25)
                        }
                    }
                })
            })
        }
    }
}

export default ScrollToTarget
