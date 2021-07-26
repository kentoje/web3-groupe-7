const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const connect = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) return handler(req, res);

  mongoose.connect(process.env.DB_URI)
    .catch((err) => {
      console.error(err);
    });

  return handler(req, res);
};

module.exports = {
  connect,
};
