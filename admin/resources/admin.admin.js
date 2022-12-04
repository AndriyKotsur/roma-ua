const { Admin } = require('../../models');
const {
  before: passwordBeforeHook,
  after: passwordAfterHook,
} = require('./actions/password.hook');

const options = {
  properties: {
    password: {
      type: 'password',
    },
    hashedPassword: {
      isVisible: false,
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
  actions: {
    new: {
      before: passwordBeforeHook,
      after: passwordAfterHook,
    },
    edit: {
      before: passwordBeforeHook,
      after: passwordAfterHook,
    },
  },
};

module.exports = {
  options,
  resource: Admin,
};
