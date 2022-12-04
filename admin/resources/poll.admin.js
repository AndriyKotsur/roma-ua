const { Poll } = require('../../models')

const options = {
  properties: {
    'answers.votes': {
      isVisible: { show: true, new: false, edit: false, list: false, filter: false},
    },
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
  resource: Poll,
};
