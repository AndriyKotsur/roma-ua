const AdminBro = require('admin-bro');
const { Organization } = require('../../models');
const { before: uploadBeforeHook } = require('./actions/upload-image.hook.js');
const { before: deleteImageHook } = require('./actions/delete-image.hook.js');

const options = {
  properties: {
    _id: {
      isVisible: false,
    },
    url: {
      isVisible: false,
    },
    image: {
      isVisible: false,
    },
    type: {
      isVisible: false,
    },
    createdAt: {
      isVisible: false,
    },
    updatedAt: {
      isVisible: false,
    },
    views: {
      isVisible: false,
    },
    content: {
      type: 'richtext',
      custom: {
        modules: {
          toolbar: [
            [ { header: [1, 2, 3, 4, 5, 6, false] } ],
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'image', 'video'],
            ['blockquote', 'code-block'],
            [ { list: 'ordered' }, { list: 'bullet' } ],
            [ { script: 'sub' }, { script: 'super' } ],
            [ { indent: '-1' }, { indent: '+1' } ],
            [ { direction: 'rtl' } ],
            [ { size: ['small', false, 'large', 'huge'] } ],
            [ { color: [] }, { background: [] } ],
            [ { font: [] } ],
            [ { align: [] } ],
            ['clean'],
          ]
        },
      },
      isVisible: { new: true, list: false, show: true, delete: true, edit: true }
    },
    category: {
      availableValues: [
        { value: 'ukraine', label: 'Організації України' },
        { value: 'transcarpathia', label: 'Організації Закарпаття' },
        { value: 'world', label: 'Міжнародні організації' },
      ],
    },
    uploadImage: {
      isVisible: { new: true, list: true, show: true, delete: true, edit: true, filter: false },
      components: {
        new: AdminBro.bundle('./components/upload-image.edit.jsx'),
        edit: AdminBro.bundle('./components/upload-image.edit.jsx'),
        list: AdminBro.bundle('./components/upload-image.list.jsx'),
        show: AdminBro.bundle('./components/upload-image.list.jsx'),
      },
    },
    date: {
      isVisible: { new: false, show: true, list: true, filter: false, edit: false, }
    },
    comments: {
      isVisible: { new: false, show: true, list: false, filter: false, edit: false, },
      components: {
        show: AdminBro.bundle('./components/comments.show.jsx'),
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
  resource: Organization,
};
