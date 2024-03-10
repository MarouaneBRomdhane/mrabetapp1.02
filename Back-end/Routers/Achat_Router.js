const express = require("express");
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../Controllers/Achat_controller");

const ProductstRouter = express.Router();

ProductstRouter.post("/create", createProduct);
ProductstRouter.get("/get", getProduct);
ProductstRouter.put("/update/:id", updateProduct);
ProductstRouter.delete("/delete/:id", deleteProduct);

module.exports = ProductstRouter;
