const { buildAuthenticatedRouter } = require('@admin-bro/express');
const bcrypt = require('bcryptjs');
const { Admin } = require('../models');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const buildAdminRouter = (admin) => {
  const router = buildAuthenticatedRouter(admin, {
    cookieName: 'admin-bro-roma',
    cookiePassword: 'admin-bro-roma-cookie-password',
    authenticate: async (email, password) => {
      try {
        const administrator = await Admin.findOne({ email });
        const isMatch = await bcrypt.compare(password, administrator.hashedPassword);
        if (isMatch) {
          return administrator;
        }
        return null;
      } catch (err) {
        console.error(err);
        return null;
      }
    },
  }, null, {
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  });
  return router;
};

module.exports = buildAdminRouter;
