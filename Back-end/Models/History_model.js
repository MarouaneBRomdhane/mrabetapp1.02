const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema(
  {
    caisses1: [
      {
        Title: { type: String },
        Recette: [{ montant: Number, date: String }],
        Liquide: { montantLiquide: Number },
        Cheques: [{ NumeroDeCheque: Number, MontantDeCheque: Number }],
        TPEs: [{ NumeroDeTransaction: Number, MontantDeTransaction: Number }],
        TicketDeCaisse: [{ Image: String, date: String }],
        TypeDeTransaction: String,
      },
    ],
    caisseEvent: {
      Title: { type: String },
      Recette: [{ montant: Number, date: String }],
      Liquide: { montantLiquide: Number },
      Cheques: [{ NumeroDeCheque: Number, MontantDeCheque: Number }],
      TPEs: [{ NumeroDeTransaction: Number, MontantDeTransaction: Number }],
      TicketDeCaisse: [{ Image: String, date: String }],
      TypeDeTransaction: String,
    },
    Bankcaisse: {
      Title: { type: String },
      Montant: { type: Number },
      Motif: { type: String },
      date: { type: String },
    },
    AchatProduct: [
      {
        Facture: { type: String },
        Product: [
          {
            Name: { type: String },
            Quantity: { type: Number },
            Price: { type: Number },
            UnitPrice: { type: Number },
            Unity: { type: String },
            Affectation: { type: String },
            Cuisine: { type: Number },
            Pizzeria: { type: Number },
            Pâtisserie: { type: Number },
            Bar: { type: Number },
          },
        ],
      },
    ],
    LiquideDisponible: {
      LiquideDisponible: { type: Number },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("History", HistorySchema);
