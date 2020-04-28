const Memory = require("../models/memory");

exports.getMemories = async (req, res, next) => {
  try {
    const memories = await Memory.find();

    return res
      .status(200)
      .json({ success: true, count: memories.length, data: memories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while loading memories " });
  }
};
