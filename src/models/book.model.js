const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    descriptions: { type: String, required: true },
    category: { type: String, required: true },
    pageCount: { type: Number, required: true },
    status: { type: String, default: "available" },
    trackingDetails: {
      available: { type: Date, default: Date.now },
      outForReading: { type: Date, default: null},
      returned: { type: Date, default: null },
    },
  },
  {
    versionKey: false,
    timestamp: true,
  }
);
module.exports = mongoose.model("book", bookSchema);
