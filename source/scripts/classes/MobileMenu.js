class MobileMenu {
    constructor({
        ...options
    }) {
        if (!options) {
            console.error('Please add a valid css selectors')
        } else {
            this.header = document.querySelector('.header')
            this.switcher = document.getElementById(options.switcher)
            this.menu = document.getElementById(options.menuBox)
            this.search = document.querySelector(options.search)
            this.app = options.app
            
            this.isOpen = false
            this.events()
        }
    }

    events() {
        this.switcher.addEventListener('click', this.toggleMenu.bind(this))
    }

    toggleMenu() {
        this.isOpen = !this.isOpen

        if (this.isOpen) {
            this.open()
        } else {
            this.close()
        }
    }

    open() {
        this.switcher.classList.add('hamburger-active')
        this.menu.classList.add('hamburger-active')
        this.search.classList.add('hamburger-active')
        this.app.body.lockScroll(true)
    }
    
    close() {
        this.switcher.classList.remove('hamburger-active')
        this.menu.classList.remove('hamburger-active')
        this.search.classList.remove('hamburger-active')
        this.app.body.lockScroll(false)
    }
}

export default MobileMenu