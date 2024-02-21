const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    Facture: { type: String },
    Product: [
      {
        Name: { type: String, required: true },
        Quantity: { type: Number, required: true },
        Price: { type: Number, required: true },
        UnitPrice: { type: Number },
        Unity: { type: String, required: true },
        Affectation: { type: String },
        Cuisine: { type: Number },
        Pizzeria: { type: Number },
        Pâtisserie: { type: Number },
        Bar: { type: Number },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Products", ProductSchema);
