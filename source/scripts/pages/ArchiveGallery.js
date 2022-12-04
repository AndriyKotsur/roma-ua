import Page from '../classes/Page'

class ArchiveGallery extends Page {
  constructor() {
    super()

    this.init()
    this.events()
  }

  init() {
    console.log('Front Page')
  }

  events() {}
}

new ArchiveGallery()