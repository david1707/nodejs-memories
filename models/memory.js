const getDB = require("../utils/databaseConfig").getDB;

class Memory {
  constructor(title, imageUrl, gps, comment) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.gps = gps;
    this.comment = comment;
  }

  save() {
    const db = getDB();
    return db
      .collection("memories")
      .insertOne(this)
      .then((result) => result)
      .catch((err) => console.log(err));
  }

  static getMemories() {
    const db = getDB();
    return db
      .collection("memories")
      .find()
      .toArray()
      .then((result) => result)
      .catch((err) => console.log(err));
  }
}

module.exports = Memory;
