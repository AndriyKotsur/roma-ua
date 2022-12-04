import App from '../App/App'
import requestAjax from '../../utils/requests'
import Preloader from './render/Preloader'
import Form from './render/Form'
import Liqpay from './render/Liqpay'

class Support {
    constructor({
        ...options
    }) {
        if (!options) {
            console.error('Please add a valid css selectors')
        } else {
            this.app = new App()
            /* Support block variables */
            this.btns = document.querySelectorAll(options.btns)
            this.arr = Array.prototype.slice.call(this.btns, 0)
            this.activeBtn
            /* Loader block variables */
            this.loader = document.getElementById(options.loader)
            this.close = document.getElementById(options.close)
            this.loaderBox = loader.querySelector('.progress__inner')
            /* Request data */
            this.value = 'medium' || null
            this.name = ''
            this.phone = ''
            this.email = ''

            this.data = {
                amount: this.value,
                name: this.name,
                phone: this.phone,
                email: this.email
            }

            this.events()
        }
    }

    events() {
        this.arr.forEach(btn => {
            btn.addEventListener('click', (event) => {
                event.preventDefault()
                this.activeBtn = btn
                this.data.amount = this.activeBtn.dataset.value

                this.openModal(this.activeBtn.dataset.value)
            })
        })

        this.close.addEventListener('click', () => {
            this.closeModal()
        })

        document.addEventListener('submit', (event) => {
            if (event.target && event.target.id === 'confirm') {
                event.preventDefault()
                this.request()
            }
        })
    }

    openModal() {
        this.app.body.lockScroll(true)
        this.loader.classList.add('active')
        this.close.classList.add('active')

        this.loaderBox.innerHTML = Form()
    }

    closeModal() {
        this.app.body.lockScroll(false)
        this.close.classList.remove('active')
        this.loader.classList.remove('active')

        this.loaderBox.innerHTML = ''
    }

    request() {
        const name = document.getElementById('confirm-name').value
        const phone = document.getElementById('confirm-phone').value
        const email = document.getElementById('confirm-email').value
        const checkbox = document.getElementById('confirm-policy').checked

        if (checkbox) {
            this.data.name = name
            this.data.phone = phone
            this.data.email = email

            requestAjax('/donate', this.data).then(response => this.onResponse(response))
        }
    }

    onResponse(response) {
        const {
            data,
            signature
        } = response

        this.loaderBox.innerHTML = Preloader()
        document.body.insertAdjacentHTML('afterbegin', Liqpay({
            data,
            signature
        }))

        this.app.body.lockScroll(false)

        const donate = document.getElementById('donate-btn')
        setTimeout(() => {
            if (donate) {
                donate.click()
            }
        }, 1000)
    }
}

export default Support