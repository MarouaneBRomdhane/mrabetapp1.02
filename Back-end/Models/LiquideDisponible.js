const mongoose = require("mongoose");

const LiquideDisponibleSchema = new mongoose.Schema(
  {
    LiquideDisponible: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("LiquideDisponible", LiquideDisponibleSchema);
