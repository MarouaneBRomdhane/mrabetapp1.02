const express = require("express");
const {
  createProduct,
  getProduct,
  updateProduct,
} = require("../Controllers/Achat_controller");

const ProductstRouter = express.Router();

ProductstRouter.post("/create", createProduct);
ProductstRouter.get("/get", getProduct);
ProductstRouter.put("/update/:id", updateProduct);

module.exports = ProductstRouter;
