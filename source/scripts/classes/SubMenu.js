class SubMenu {
    constructor({
        ...options
    }) {
        if (!options) {
            console.error('Please add a valid css selectors')
        } else if (typeof options.menu !== 'string' && typeof options.switcher !== 'string') {
            console.error(options.selector, `is not a string but a(n) ${typeof options.selector}`)
        } else {
            this.menu = document.querySelector(options.menu)
            this.switcher = document.querySelectorAll(options.switcher)
            this.arr = Array.prototype.slice.call(this.switcher, 0)

            this.event()
        }
    }

    event() {
        this.arr.forEach(elem => {
            const menu = elem.querySelector('.header__submenu')

            if (menu) {
                elem.addEventListener('click', () => {
                    this.toggle(elem, menu)
                })
            }
        })

        window.addEventListener('click', (event) => {
            this.hide(event)
        })
    }

    hide(event) {
        let isClickInside = this.menu.contains(event.target)

        if (!isClickInside && this.menu.querySelector('.submenu-active')) {
            this.menu.querySelector('.active').classList.remove('active')
            this.menu.querySelector('.submenu-active').classList.remove('submenu-active')
        }
    }

    toggle(btn, menu) {
        if (btn.classList.contains('active')) {
            this.close(menu, btn)
        } else if (this.menu.querySelector('.active')) {
            this.menu.querySelector('.active').classList.remove('active')
            this.menu.querySelector('.submenu-active').classList.remove('submenu-active')

            this.open(menu, btn)
        } else {
            this.open(menu, btn)
        }
    }

    open(menu, btn) {
        menu.classList.add('submenu-active')
        btn.classList.add('active')
    }

    close(menu, btn) {
        menu.classList.remove('submenu-active')
        btn.classList.remove('active')
    }
}

export default SubMenu