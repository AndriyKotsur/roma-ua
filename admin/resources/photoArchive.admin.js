const AdminBro = require('admin-bro');
const { PhotoArchive } = require('../../models');
const { before: uploadBeforeHook } = require('./actions/upload-photo-archive.hook.js');
const { before: deleteImageHook } = require('./actions/delete-document.hook.js');

const options = {
  properties: {
    _id: {
      isVisible: false,
    },
    createdAt: {
      isVisible: false,
    },
    url: {
      isVisible: false,
    },
    updatedAt: {
      isVisible: false,
    },
    images: {
      isVisible: false,
    },
    uploadImages: {
      type: Array,
      isVisible: { new: true, list: false, show: true, delete: true, edit: true, filter: false, },
      components: {
        new: AdminBro.bundle('./components/upload-photo-archive.edit.jsx'),
        edit: AdminBro.bundle('./components/upload-photo-archive.edit.jsx'),
        show: AdminBro.bundle('./components/upload-photo-archive.list.jsx'),
      },
    },
  },
  actions: {
    new: {
      before: (request, context) => uploadBeforeHook(request, context),
    },
    edit: {
      // before: (request, context) => uploadBeforeHook(request, context),
      isVisible: false,
    },
    delete: {
      before: (request, context) => deleteImageHook(request, context)
    },
  },
};

module.exports = {
  options,
  resource: PhotoArchive,
};
