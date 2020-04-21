const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://david:nonono33@cluster0-qnzrq.mongodb.net/tutorial?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  )
    .then((client) => {
      console.log("Connected");
      db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const getDB = () => {
  if (db) return db;
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
