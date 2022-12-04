

class Device {
    constructor(){
      this.isMobile = false 
      this.isTablet = false 
      this.isDesktop = false
      
      this.events()
      this.init()
    }
  
    init(){
      this.switchDeviceOnScreenWidth()
    }
  
    events(){
      window.addEventListener('resize', this.switchDeviceOnScreenWidth.bind(this))
    }
  
  
    switchDeviceOnScreenWidth(){
      var screenWidth = window.innerWidth
  
      if(screenWidth<768){
        this.isMobile = true
        this.isTablet = false 
        this.isDesktop = false
      }
      if(screenWidth>=768 && screenWidth<1024){
        this.isTablet = true
        this.isMobile = false 
        this.isDesktop = false
  
      }
      if(screenWidth>=1024){
        this.isDesktop = true
        this.isMobile = false 
        this.isTablet = false 
      }
      
    }
  }
  
  export default Device