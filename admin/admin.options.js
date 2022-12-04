const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

const { Admin, News, Video, Organization, Portrait, Blog, Poll, Comment, Media, DocumentArchive, PhotoArchive, Supporter } = require('./resources');
const { translations } = require('./translation/locale.options');

const options = {
  rootPath: '/control-panel',
  loginPath: '/control-panel/login',
  logoutPath: '/control-panel/login',
  branding: {
    companyName: 'RomaUA: Control panel',
  },
  locale: translations,
  resources: [
    Admin,
    News,
    Video,
    Organization,
    Portrait,
    Blog,
    Poll,
    Comment,
    Media,
    DocumentArchive,
    PhotoArchive,
    Supporter,
  ],
};

module.exports = options;
