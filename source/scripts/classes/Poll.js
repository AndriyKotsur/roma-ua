import requestAjax from '../utils/requests'

class Poll {
    constructor({
        ...options
    }) {
        if (!options) {
            console.error('Please add a valid css selectors')
        } else {
            this.form = document.getElementById(options.form)
            this.poleItems = document.querySelectorAll(options.poleItems)
            this.voteBtn = document.getElementById(options.voteBtn)

            this.container = document.querySelector(options.container)
            this.pollId

            this.arr = Array.prototype.slice.call(this.poleItems, 0)
            this.activeBtn

            this.init()
            this.events()
        }
    }

    init() {
        const local = localStorage.getItem('poll')

        if (this.container) {
            this.pollId = this.container.getAttribute('id')
            if (local === this.pollId) {
                this.calculate()
                this.arr.forEach(btn => btn.classList.add('voted'))
                this.voteBtn.setAttribute("disabled", "disabled")
                this.voteBtn.classList.add('disabled')
            }
        }
    }

    events() {
        if (this.arr) {
            this.arr.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    event.preventDefault()

                    this.activeBtn ? this.activeBtn.classList.remove('selected') : ''
                    this.activeBtn = btn

                    this.select(btn)
                })
            })
        }

        if (this.voteBtn) {
            this.voteBtn.addEventListener('click', () => {
                let index = this.activeBtn.dataset.index

                this.request(index)
            })
        }
    }

    select(btn) {
        btn.classList.add('selected')
    }

    show(btns) {
        this.activeBtn.classList.remove('selected')
        btns.forEach(btn => btn.classList.add('voted'))

        this.voteBtn.setAttribute("disabled", "disabled");
        this.voteBtn.classList.add('disabled')
    }

    render(width) {
        const titles = document.querySelectorAll('.poll__item-title')
        const arrTitles = Array.prototype.slice.call(titles, 0)

        const progress = document.querySelectorAll('.poll__item-progress')
        const progressArr = Array.prototype.slice.call(progress, 0)

        for (let i = 0; i < width.length; i++) {
            progressArr[i].style.width = `${width[i]}%`
            arrTitles[i].innerHTML += ` - ${width[i]}%`
        }
    }

    calculate(index) {
        if (index)
            this.arr[index].dataset.votes = +this.arr[index].dataset.votes + 1

        let sum = 0
        for (const answer of this.arr) {
            sum += +answer.dataset.votes
        }

        let width = []
        for (const answer of this.arr) {
            width.push(Math.round(+answer.dataset.votes * 100 / sum))
        }

        this.render(width)
    }

    request(index) {

        let data = {
            index: index,
            id: this.pollId,
        }

        requestAjax('/add-vote', data).then(response => this.onResponse(response, index))
    }

    onResponse(res, index) {
        if (res) {
            localStorage.setItem('poll', this.pollId)
            this.calculate(index)
            this.show(this.arr)
        }
    }
}

export default Poll