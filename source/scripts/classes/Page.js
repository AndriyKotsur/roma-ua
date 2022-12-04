import 'lazysizes'
import App from './App/App'
import Preloader from './Preloader'
import ShowDate from './ShowDate'
import MobileMenu from './MobileMenu'
import SubMenu from './SubMenu'
import Search from './Search/Search'


export default class Page {
    constructor() {
      this.initPage()
      
      this.onInit && this.onInit()
      this.events && this.events()
    }
  
    initPage() {
      const app = new App()

      this.preloader = new Preloader({
        preloader: 'preloader'
      })

      this.mobMenu = new MobileMenu({
        app,
        switcher: 'burger',
        menuBox: 'header-menu',
        search: '.header__search'
      })

      this.subMenu = new SubMenu({
        switcher: '.header__menu-item',
        menu: '.header__menu'
      })

      this.search = new Search({
        input: 'search',
        box: 'search-results'
      })

      this.showDate = new ShowDate({
        date: 'date',
        year: 'year'
      })
    }
  }