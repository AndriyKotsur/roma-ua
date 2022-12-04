import App from '../App/App'
import requestAjax from '../../utils/requests'
import { getCookie, setCookie } from '../../utils/cookie'
import Preloader from './render/Preloader'

class Comment {
    constructor({
        ...options
    }) {
        if (!options) {
            console.error('Please add a valid css selectors')
        } else {
            this.app = new App()
            /* Comment block variables */
            this.form = document.getElementById(options.form)
            this.inputName = document.getElementById(options.inputName)
            this.inputTextarea = document.getElementById(options.inputTextarea)
            this.counter = document.getElementById(options.counter)
            this.btn = document.getElementById(options.btn)
            /* Loader block variables */
            this.loader = document.getElementById(options.loader)
            this.close = document.getElementById(options.close)
            /* Request data */
            this.name = ''
            this.text = ''

            this.data = {
                id: this.form.dataset.id,
                title: this.form.dataset.title,
                name: this.name,
                text: this.text
            }

            this.message = {
                success: 'Ваш коментар успішно відправлено. Коментар буде доступний після модерації!',
                error: 'Під час добавлення коментаря виникли технічні проблеми.'
            }
            this.init()
            this.events()
        }
    }

    init() {
        const isCookie = getCookie('_cc')
        if(isCookie && isCookie === this.form.dataset.id) {
            this.btn.classList.add('disabled')
            this.btn.disabled = true
        } else {
            this.btn.classList.remove('disabled')
            this.btn.classList.disabled = false
        }
    }

    events() {
        this.inputTextarea.addEventListener('input', (event) => {
            let target = event.target
            this.symbolsCounter(target, this.counter)
        })

        this.form.addEventListener('submit', (event) => {
            this.request(event)
        })

        this.close.addEventListener('click', () => {
            this.closeModal()
        })
    }

    symbolsCounter(target, counter) {
        let currentSymbols = counter.querySelector('.comment__counter-current')
        let maxSymbols = counter.querySelector('.comment__counter-max')

        target.setAttribute('minLength', 10)
        target.setAttribute('maxLength', 1500)

        let currentLength = target.value.length ? target.value.length : 0
        let maxLength = 1500 ? 1500 : target.getAttribute('maxlength')

        currentSymbols.innerHTML = currentLength
        maxSymbols.innerHTML = maxLength
    }

    request(event) {
        event.preventDefault()
        this.data.name = this.inputName.value
        this.data.text = this.inputTextarea.value
        this.btn.setAttribute("disabled", "disabled")

        this.loader.classList.add('active')

        requestAjax('/create-comment', this.data).then(response => this.onResponse(response))
    }

    changeHandler(loader, message) {
        this.app.body.lockScroll(true)
        let loaderBox = loader.querySelector('.progress__inner')
        loaderBox.innerHTML = Preloader()

        setTimeout(() => {
            loaderBox.innerHTML = ''
            loaderBox.insertAdjacentElement('beforeend', this.renderMessage(message))

            this.close.classList.add('active')
        }, 1000)
    }

    renderMessage(message) {
        let messageBox = document.createElement('p')
        messageBox.classList.add('progress__message')
        messageBox.textContent = message

        return messageBox
    }

    closeModal() {
        this.app.body.lockScroll(false)

        this.close.classList.remove('active')
        this.loader.classList.remove('active')

        let loaderBox = this.loader.querySelector('.progress__inner')
        loaderBox.innerHTML = ''
    }

    onResponse(res) {
        this.btn.removeAttribute("disabled")

        if (res) {
            this.form.reset()
            this.changeHandler(this.loader, this.message.success)

            setCookie('_cc', this.form.dataset.id, {'max-age': 120})

        } else {
            this.changeHandler(this.loader, this.message.error)
        }
    }
}

export default Comment