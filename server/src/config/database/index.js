const Mongodb = require('mongodb');

const connect = () => {
  Mongodb.MongoClient.connect(process.env.DB_URI, (err) => {
    if (err) console.log(err);
    console.log('Connected successfully to server');
  });
};

module.exports = {
  connect,
};
