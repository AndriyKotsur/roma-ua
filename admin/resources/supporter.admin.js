const { Supporter } = require('../../models');

const options = {
  properties: {
    _id: {
      isVisible: false,
    },
    updatedAt: {
      isVisible: false,
    },
  },
  actions: {
    new: {
      isVisible: false,
    },
    edit: {
      isVisible: false,
    },
    delete: {
      isVisible: false,
    },
  },
};

module.exports = {
  options,
  resource: Supporter,
};
