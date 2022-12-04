class ShowDate {
  constructor({
    ...options
  }) {
    if (!options) {
      console.error('Please add a valid css selectors')
    } else if (typeof options.date !== 'string') {
      console.error(options.selector, `is not a string but a(n) ${typeof options.selector}`)
    } else {
      this.date = document.getElementById(options.date)
      this.year = document.getElementById(options.year)
      this.init()
    }
  }

  init() {
    this.format()
  }

  format() {
    let currentDate = new Date()
    let currentYear = new Date().getFullYear()

    const options = {
      timeZone: 'EET',
      hour12: false,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }

    this.show(currentDate.toLocaleString('uk-UA', options), currentYear)
  }

  show(currentDate, currentYear) {
    this.date.innerHTML = currentDate
    this.year.innerHTML = currentYear
  }
}

export default ShowDate