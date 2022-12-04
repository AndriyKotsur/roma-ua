import Page from '../classes/Page'

class NotFound extends Page {
    constructor() {
        super()
        this.back = document.getElementById('back')

        this.handleBack()
    }

    handleBack() {
        if (this.back) {
            this.back.addEventListener('click', () => {
                this.redirect()
            })
        }
    }

    redirect() {
        history.back()
    }
}

new NotFound()