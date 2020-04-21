const mongodb = require("mongodb");

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
      .catch((err) => console.error(err));
  }

  static getMemories() {
    const db = getDB();
    return db
      .collection("memories")
      .find()
      .toArray()
      .then((result) => result)
      .catch((err) => console.error(err));
  }

  static getMemory(memoryId) {
    const db = getDB();
    return db
      .collection("memories")
      .findOne({ _id: new mongodb.ObjectId(memoryId) })
      .then((memory) => {
        return memory;
      })
      .catch((err) => console.error(err));
  }

  static updateMemory(memoryID, memory) {
    const db = getDB();
    return db
      .collection("memories")
      .findOneAndUpdate(
        { _id: new mongodb.ObjectId(memoryID) },
        { $set: memory },
        { returnOriginal: false }
      )
      .then((data) => {
        return data.value;
      })
      .catch((err) => console.error(err));
  }

  static deleteMemory(memoryID) {
    const db = getDB();
    return db
      .collection("memories")
      .findOneAndDelete({ _id: new mongodb.ObjectId(memoryID) })
      .then((_) => {
        console.log(`Memory with ID ${memoryID} deleted`)
      })
      .catch((err) => console.error(err));
  }
}

module.exports = Memory;
