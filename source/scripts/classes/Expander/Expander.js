import HeightUpdater from './render/HeightUpdater'
import Toggler from './render/Toggler'

class Expander {
    constructor(props) {
        this.clickTargets = document.querySelectorAll(props.target + '-main')
        this.openTargets = document.querySelectorAll(props.target + '-expanded')
        this.openTargetClass = props.target + '-expanded'
        this.active = props.target + '-active'
        this.hUpdater = new HeightUpdater(this.openTargets)
        this.Toggler = new Toggler(this.openTargets, this.active)

        this.test = []
        this.events()
    }

    events() {
        Array.from(this.clickTargets).map(btn => btn.addEventListener('click', () => this.handleClick(btn)))
        this.hUpdater.init()
    }

    handleClick(btn) {
        let boxToOpen = btn.parentElement.querySelector(this.openTargetClass)
        this.closeAll(this.openTargets)
        this.Toggler.toggleHeight(boxToOpen)
    }
    closeAll(targets) {
        targets.forEach(el => {
            this.Toggler.hide(el)
        })
    }
}

export default Expander