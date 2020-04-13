const fs = require("fs");
const path = require("path");

const filePath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "memories.json"
);

module.exports = class Memory {
  constructor(title, imageUrl, gps, comment) {
    this.id = Math.random();
    this.title = title;
    this.imageUrl = imageUrl;
    this.gps = gps;
    this.comment = comment;
  }

  save() {
    fs.readFile(filePath, (err, response) => {
      let memories = [];
      if (!err) {
        memories = JSON.parse(response);
      }
      memories.push(this);
      fs.writeFile(filePath, JSON.stringify(memories), (err) =>
        console.log(err)
      );
    });
  }

  static getMemories(callback) {
    fs.readFile(filePath, (err, response) => {
      if (err) {
        return callback([]);
      }
      return callback(JSON.parse(response));
    });
  }
};
