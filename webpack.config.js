const path = require('path')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const PAGES_PATH = './source/scripts/pages/'

module.exports = {
  entry: {
    front: PAGES_PATH + 'Front.js',
    article: PAGES_PATH + 'Article.js',
    news: PAGES_PATH + 'News.js',
    videos: PAGES_PATH + 'Videos.js',
    organizations: PAGES_PATH + 'Organizations.js',
    portraits: PAGES_PATH + 'Portraits.js',
    media: PAGES_PATH + 'Media.js',
    archiveGallery: PAGES_PATH + 'ArchiveGallery.js',
    archiveBooks: PAGES_PATH + 'ArchiveBooks.js',
    archiveDocuments: PAGES_PATH + 'ArchiveDocuments.js',
    book: PAGES_PATH + 'Book.js',
    document: PAGES_PATH + 'Document.js',
    gallery: PAGES_PATH + 'Gallery.js',
    donate: PAGES_PATH + 'Donate.js',
    privacyPolicy: PAGES_PATH + 'PrivacyPolicy.js',
    offerAgreement: PAGES_PATH + 'OfferAgreement.js',
    notFound: PAGES_PATH + 'NotFound.js'
  },
  output: {
    path: path.resolve(__dirname, './public/scripts'),
    filename: '[name].bundle.js'
  },
  plugins: [],
  module: {
    rules: [{
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
};