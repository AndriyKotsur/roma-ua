import Device from "./Device"
import Body from "./Body"

class App {
  constructor(){
    this.device = new Device()
    this.body = new Body()
  }
}

export default App