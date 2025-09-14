// backend/src/models/Quote.cjs
const mongoose = require("mongoose");
const { getNextId } = require("../services/idService.cjs");

const quoteSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true }, // auto-increment id
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    companyName: { type: String, required: true },
    industries: [
      {
        industry: { type: String, required: true },
        units: { type: Number, required: true }
      }
    ],
    totalUnits: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
  },
  { timestamps: true }
);

// Auto-increment `id` before saving
quoteSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      this.id = await getNextId("quote");
    } catch (err) {
      return next(err);
    }
  }
  next();
});

module.exports =
  mongoose.models.Quote || mongoose.model("Quote", quoteSchema);
