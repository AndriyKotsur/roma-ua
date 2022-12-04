const AdminBro = require('admin-bro');
const { DocumentArchive } = require('../../models');
const { before: uploadBeforeHook } = require('./actions/upload-document.hook.js');
const { before: deleteImageHook } = require('./actions/delete-document.hook.js');

const options = {
  properties: {
    _id: {
      isVisible: false,
    },
    type: {
      availableValues: [
        { value: 'document', label: 'Документ' },
        { value: 'book', label: 'Книга' },
      ],
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
    document: {
      isVisible: false,
    },
    uploadDocument: {
      isVisible: { new: true, list: true, show: true, delete: true, edit: true, filter: false, },
      components: {
        new: AdminBro.bundle('./components/upload-document.edit.jsx'),
        edit: AdminBro.bundle('./components/upload-document.edit.jsx'),
        list: AdminBro.bundle('./components/upload-document.list.jsx'),
        show: AdminBro.bundle('./components/upload-document.list.jsx'),
      },
    },
  },
  actions: {
    new: {
      before: (request, context) => uploadBeforeHook(request, context),
    },
    edit: {
      before: (request, context) => uploadBeforeHook(request, context),
    },
    delete: {
      before: (request, context) => deleteImageHook(request, context)
    },
  },
};

module.exports = {
  options,
  resource: DocumentArchive,
};
