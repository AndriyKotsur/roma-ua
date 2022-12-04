require('dotenv').config();
const {
  default: AdminBro
} = require('admin-bro');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const path = require('path');

const routes = require('./routes');

const options = require('./admin/admin.options');
const buildAdminRouter = require('./admin/admin.router');

const app = express();

const run = async () => {
  await require('./database');

  // admin bro setup
  const admin = new AdminBro(options);
  const adminRouter = buildAdminRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.static('public'));
  app.use('/public/images', express.static('public/images'));
  app.use('/public/archives', express.static('public/archives'));

  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.expectCt());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.referrerPolicy());
  app.use(helmet.xssFilter());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        "default-src": ["'self'"],
        "img-src": ["'self'", "data:", "https://img.youtube.com"],
        "frame-src": ["'self'", "https://www.youtube.com", "https://www.google.com"],
        "script-src-elem": ["'self'", "https://www.google.com", "https://www.gstatic.com", "https://www.googletagmanager.com", "https://www.google-analytics.com 'unsafe-inline'"],
        "style-src": ["'self'", "https://www.google.com 'unsafe-inline'"],
        "connect-src": ["'self'", "https://www.google-analytics.com"]
      },
    }),
  );

  app.use('/', routes);
  app.use((_, res) => {
    res.status(404).render('not-found', {
      pageId: 'notFound'
    });
  });

  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on port ${process.env.PORT || 5000}`);
  });
};

run();
