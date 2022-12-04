const { Comment } = require('../../models');
const { before: deleteCommentHook } = require('./actions/delete-comment.hook.js');

const options = {
  properties: {
    _id: {
      isVisible: false,
    },
    news: {
      isVisible: false,
    },
    video: {
      isVisible: false,
    },
    portrait: {
      isVisible: false,
    },
    blog: {
      isVisible: false,
    },
    organization: {
      isVisible: false,
    },
    createdAt: {
      isVisible: { new: false, list: false, show: false, delete: false, edit: false, filter: true, },
    },
    updatedAt: {
      isVisible: false,
    },
    title: {
      isVisible: { new: false, list: true, show: true, edit: false, filter: true, },
    },
    text: {
      isVisible: { new: false, list: true, show: true, edit: false, filter: true, },
    },
    userName: {
      isVisible: { new: false, list: true, show: true, edit: false, filter: true, },
    },
    date: {
      isVisible: { new: false, list: true, show: true, delete: false, edit: false, filter: true, },
    }
  },
  actions: {
    new: {
      isVisible: false,
    },
    delete: {
      before: (request, context) => deleteCommentHook(request, context)
    },
  },
}

module.exports = {
  options,
  resource: Comment,
};
