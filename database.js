require('dotenv').config();
const mongoose = require('mongoose');

module.exports = mongoose.connect(
  process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
)
.then(() => console.log('Database connected'))
.catch(() => console.log('Database disconnected'));
