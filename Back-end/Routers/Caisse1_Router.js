const express = require("express");
const {
  createCaisse1,
  getCaisse1,
  updateCaisses1,
} = require("../Controllers/Caisse1_controller");

const CaisseRouter = express.Router();

CaisseRouter.post("/create", createCaisse1);
CaisseRouter.get("/get", getCaisse1);
CaisseRouter.put("/update/:id", updateCaisses1);

module.exports = CaisseRouter;
