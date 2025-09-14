// backend/src/services/idService.cjs
const Counter = require("../models/Counter.cjs");

async function getNextId(sequenceName) {
  const counter = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true } // create if not exists
  );
  return counter.seq;
}

module.exports = { getNextId };
