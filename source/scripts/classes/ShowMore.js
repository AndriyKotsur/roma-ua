class ShowMore {
    constructor({
        ...options
    }) {
        if (!options) {
            console.error('Please add a valid css selectors')
        } else if (typeof options.container !== 'string' && typeof options.btn !== 'string') {
            console.error(options.selector, `is not a string but a(n) ${typeof options.selector}`)
        } else {
            this.container = document.getElementById(options.container)
            this.btn = document.getElementById(options.btn)
            this.text = this.btn.querySelector('span')

            this.isOpen = false
            this.init()
            this.events()
        }
    }

    init() {
        this.handle()
    }

    events() {
        this.btn.addEventListener('click', () => {
            this.isOpen = !this.isOpen

            if (this.isOpen) {
                this.open()
            } else {
                this.hide()
            }
        })

        window.addEventListener('resize', () => {
            this.hide()
        })
    }

    handle() {
        let box = this.container.getBoundingClientRect()

        if (box.height < 115 && window.innerWidth >= 320) {
            this.btn.classList.remove('extended')
        } else if (box.height < 105 && window.innerWidth === 320) {
            this.btn.classList.remove('extended')
        } else {
            this.btn.classList.add('extended')
        }
    }

    open() {
        this.text.innerHTML = 'Сховати'
        this.container.classList.add('active')
    }

    hide() {
        this.container.classList.remove('active')
        this.text.innerHTML = 'Показати більше'
    }
}

export default ShowMore