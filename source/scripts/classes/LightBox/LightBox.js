import Preloader from './render/Preloader'

class LightBox {
    constructor({
        lazyload = true,
        counter = true,
        arrows = true,
        slideSpeed = 400,
        ...options
    }) {
        if (!options.selector) {
            console.error('Please add a valid css selector with the option "selector:"');
        } else if (typeof options.selector !== 'string') {
            console.error(options.selector, `is not a string but a(n) ${typeof options.selector}`)
        } else {
            this.selector = options.selector
            this.lazyload = lazyload
            this.counter = counter
            this.arrows = arrows
            this.slideSpeed = slideSpeed

            this.links = Array.from(document.querySelectorAll(`a[data-modal="gallery"]`))
            this.offsets = []
            this.nodes = {}
            this.imageIndex = null
            this.init()
        }
    }

    init() {
        if (this.links.length > 0) {
            this.createModalbox()
            this.createNodes()
            this.events(this.links)
        }
    }

    createNodes() {
        Object.assign(this.nodes, {
            modalBox: document.getElementById('modal'),
            items: Array.from(document.querySelectorAll('.modal__item')),
            next: document.getElementById('modal-next'),
            prev: document.getElementById('modal-prev'),
            close: document.getElementById('modal-close')
        })
    }

    events(links) {
        const {
            modalBox,
            next,
            prev,
            close
        } = this.nodes

        links.forEach((item, index) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                modalBox.classList.add('active')
                document.body.style.overflow = 'hidden'
                this.imageIndex = index
                this.goTo(index, event)
                this.setNavigation(index)
            })
        })

        next.addEventListener('click', (event) => {
            this.goToNext(event)
        })

        prev.addEventListener('click', (event) => {
            this.goToPrev(event)
        })

        close.addEventListener('click', () => {
            this.closeBox();
        })
    }

    goTo(index, event) {
        const {
            items
        } = this.nodes

        const img = items[index].querySelector('img')

        if (this.lazyload) {
            const src = img.getAttribute('data-src')
            items[index].insertAdjacentHTML('beforeend', Preloader())

            img.setAttribute('src', src)

            const imgLoad = new Image()
            img.onload = () => {
                items[index].classList.add('active')
                items[index].classList.add('loaded')
            }
            imgLoad.src = src
        } else {
            items[index].classList.add('active')
            items[index].classList.add('loaded')
        }

        for (let i = 0; i < this.offsets.length; i++) {
            const offset = this.offsets[i] - (index * 100)

            items[i].style.transform = `translateX(${offset}vw)`

            if (event) {
                if (event.target.className === 'gallery__item') {
                    items[i].style.transition = `opacity 0.4s ease`
                } else {
                    items[i].style.transition = `transform ${this.slideSpeed}ms ease-out`
                }
            }
        }
    }

    setNavigation(index) {
        if (this.arrows) {
            const {
                next,
                prev
            } = this.nodes;
            if (index < (this.links.length - 1)) {
                next.classList.add('active');
            }
            if (index >= (this.links.length - 1)) {
                next.classList.remove('active');
            }
            if (index > 0) {
                prev.classList.add('active');
            }
            if (index <= 0) {
                prev.classList.remove('active');
            }
        }
    }

    goToNext(event) {
        const {
            items
        } = this.nodes

        if (this.imageIndex < items.length - 1) {
            this.goTo((this.imageIndex + 1), event)
            setTimeout(() => {
                items[this.imageIndex - 1].classList.remove('active')
            }, this.slideSpeed)
            this.imageIndex += 1
            this.setNavigation(this.imageIndex)
        }
    }

    goToPrev(event) {
        const {
            items
        } = this.nodes

        if (this.imageIndex > 0) {
            this.goTo((this.imageIndex - 1), event)
            setTimeout(() => {
                items[this.imageIndex + 1].classList.remove('active')
            }, this.slideSpeed)
            this.imageIndex -= 1
            this.setNavigation(this.imageIndex)
        }
    }

    closeBox() {
        const {
            modalBox,
            items
        } = this.nodes

        modalBox.classList.remove('active')
        document.body.style.overflow = 'auto'

        setTimeout(() => {
            items.forEach(item => item.classList.remove('active'))
        }, this.slideSpeed)
    }

    renderImages(images) {
        const imagesLinks = images.map((item, index) => {
            const offset = index * 100
            this.offsets.push(offset)

            const imageSource = item.getAttribute('href')
            return `
            <li class="modal__item" style="transform: translateX(${offset}vw)">
                <picture class="modal__image">
                    ${this.lazyload ? `
                        <img class="lazyload" data-src="${imageSource}" />
                    ` : `
                        <img src="${imageSource}" />
                    `}
                </picture>
            </li>
            `
        })
        return imagesLinks
    }

    createModalbox() {
        const modalbox = `
        <div id="modal" class="modal">
            <div class="modal__inner">
                <ul class="modal__track">
                    ${this.renderImages(this.links).join('')}
                </ul>
                <button id="modal-prev" type="button" class="btn-slider btn-slider__prev modal__prev">
                    <svg class="icon icon-arrow">
                        <use href="/icons/sprite.svg#icon-arrow"></use>
                    </svg>
                </button>
                <button id="modal-next" type="button" class="btn-slider btn-slider__next modal__next">
                    <svg class="icon icon-arrow">
                        <use href="/icons/sprite.svg#icon-arrow"></use>
                    </svg>
                </button>
                <button id="modal-close" type="button" class="modal__close">
                </button>
            </div>
        </div>`
        document.querySelector('.gallery').insertAdjacentHTML('beforeend', modalbox)
    }
}

export default LightBox