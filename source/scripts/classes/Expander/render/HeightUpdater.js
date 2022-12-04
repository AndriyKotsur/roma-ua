class HeightUpdater {
    constructor(props) {
        this.targets = props;
    }

    init() {
        window.addEventListener("resize", this.debounce(() => this.heightUpdate(), 200))
    }

    calcNewHeight(element) {
        let newH = 0
        let elementChildrens = element.children
        if (elementChildrens) {
            for (let i = 0; i < elementChildrens.length; i++) {

                newH += elementChildrens[i].scrollHeight + this.getMarginsHeight(elementChildrens[i]);
                newH += this.getPaddingsHeight(elementChildrens[i]);
            }
        } else {
            newH = element.scrollHeight;
        }
        return newH
    }

    getMarginsHeight(el) {
        let mHeight = 0
        let style = window.getComputedStyle(el, null)
        console.log(el, style.marginBottom)
        return mHeight += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10)
    }

    getPaddingsHeight(el) {
        let pHeight = 0
        let style = window.getComputedStyle(el, null)
        console.log(pHeight)
        return pHeight += parseInt(style.paddingTop, 10) + parseInt(style.paddingBottom, 10)
    }

    isOpened(el) {
        if (el.clientHeight != 0)
            return true
        return false
    }

    heightUpdate() {
        this.targets.forEach(element => {

            if (this.isOpened(element))
                element.style.height = this.calcNewHeight(element) + "px"

        })
    }

    debounce(func, wait, immediate) {
        let timeout
        return function () {
            let context = this,
                args = arguments
            let later = function () {
                timeout = null
                if (!immediate) func.apply(context, args)
            };
            let callNow = immediate && !timeout
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
            if (callNow) func.apply(context, args)
        }
    }
}

export default HeightUpdater