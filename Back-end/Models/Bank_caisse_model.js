const mongoose = require("mongoose");

const BankCaisseSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    Montant: { type: Number, required: true },
    Motif: { type: String, required: true },
    Image: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("BankCaisse", BankCaisseSchema);
