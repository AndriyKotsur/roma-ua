class Body {
  constructor() {
    this.body = document.body
  }
  
  lockScroll(lock) {

    if (lock) {
      this.body.classList.add('no-scroll')
    } else {
      this.body.classList.remove('no-scroll')
    }

  }
}

export default Body