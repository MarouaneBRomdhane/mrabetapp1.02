const mongoose = require("mongoose");

const Caisse1Schema = new mongoose.Schema({
  Title: { type: String, required: true },
  Recette: [{ montant: Number, date: String }],
  Liquide: { montantLiquide: Number },
  Cheques: [{ NumeroDeCheque: Number, MontantDeCheque: Number }],
  TPEs: [{ NumeroDeTransaction: Number, MontantDeTransaction: Number }],
  TicketDeCaisse: [{ Image: String, date: String }],
  TypeDeTransaction: String,
});
module.exports = mongoose.model("Caisses", Caisse1Schema);
