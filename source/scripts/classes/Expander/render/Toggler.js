import HeightUpdater from './HeightUpdater'

class Toggler {
    constructor(oTarget, active) {
        this.targets = oTarget
        this.target
        this.active = active.slice(1)
        this.hUpdater = new HeightUpdater()
    }

    show(target) {
        let padH = this.hUpdater.getPaddingsHeight(target)
        let marH = this.hUpdater.getMarginsHeight(target)
        target.style.height = target.scrollHeight + padH + marH + "px"
        target.parentElement.classList.add(this.active)
    }

    hide(target) {
        target.style.height = 0 + "px"
        target.parentElement.classList.remove(this.active)
    }

    isCollapsed(target) {
        if (!target.clientHeight || !target.style.height)
            return true;

        return false;
    }

    toggleHeight(current) {
        if (this.isCollapsed(current))
            this.show(current);
        else
            this.hide(current);
    }
}

export default Toggler