import requestAjax from '../../utils/requests'
import Preloader from './render/Preloader'
import SearchBox from './render/SearchBox'

class Search {
  constructor({
    ...options
  }) {
    if (!options) {
      console.error('Please add a valid css selectors')
    } else if (typeof options.input !== 'string' && typeof options.box !== 'string') {
      console.error(options.selector, `is not a string but a(n) ${typeof options.selector}`)
    } else {
      this.input = document.getElementById(options.input)
      this.box = document.getElementById(options.box)
  
      this.data = {
        search: ''
      }
  
      this.interval = 600;
      this.isLoading = false

      this.events()
    }
  }

  events() {
    this.input.addEventListener('input', () => this.changeHandler(this.input));
  }

  changeHandler(target) {
    this.data = {
      search: target.value
    }

    this.box.innerHTML !== Preloader() ? this.box.innerHTML = Preloader() : '';
    this.box.classList.add('active');

    if (target.value.length > 0) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.request(target);
      }, this.interval);
    } else {
      this.box.innerHTML = '';
      this.box.classList.remove('active');
    }
  }

  request(target) {
    requestAjax('/search', this.data).then((response) => {
      (target.value.length > 0) ? this.render(response): ''
    })
  }

  render(data) {
    if (data.length > 0) {
      this.box.innerHTML = data.map(item => SearchBox(item)).join('')
    } else {
      this.box.innerHTML = `<span class="search__results-title">Немає результатів по цьому запиту</span>`
    }
  }
}

export default Search