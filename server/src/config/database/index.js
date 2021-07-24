const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const connect = (handler) => async (req, res, next) => {
  if (mongoose.connections[0].readyState) return handler(req, res);

  mongoose.connect(process.env.DB_URI)
    .catch((err) => console.log(err));

  return handler(req, res);
};

module.exports = {
  connect,
};
