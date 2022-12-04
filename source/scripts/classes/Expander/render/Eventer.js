class Eventer {
    constructor(props) {
        this.handler
        this.event = props.event
        this.target = props.target
        this.action = props.action
        this.registerEvent()
    }

    registerEvent() {
        this.handler = () => this.action();
        this.target.addEventListener(this.event, this.handler)
    }

    removeEvent() {
        this.target.removeEventListener(this.event, this.handler)
    }
}

export default Eventer