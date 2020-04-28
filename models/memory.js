const mongoose = require("mongoose");

const { Schema } = mongoose;

const memorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  gps: {
    type: String,
    required: false,
  },
  comment: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Memory", memorySchema);