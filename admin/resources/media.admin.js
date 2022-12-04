const { Media } = require('../../models')

const options = {
  properties: {
    _id: {
      isVisible: false,
    },
    createdAt: {
      isVisible: false,
    },
    updatedAt: {
      isVisible: false,
    },
  },
}

module.exports = {
  options,
  resource: Media,
};
