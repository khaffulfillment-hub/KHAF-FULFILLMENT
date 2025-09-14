// backend/src/models/Counter.cjs
const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // sequence name (e.g., "quote")
  seq: { type: Number, default: 0 }
});

// Prevent model overwrite issues in dev/watch mode
module.exports =
  mongoose.models.Counter || mongoose.model("Counter", counterSchema);
