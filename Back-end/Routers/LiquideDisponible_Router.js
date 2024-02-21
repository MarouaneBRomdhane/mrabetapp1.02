const express = require("express");
const {
  createLiquideDisponible,
  getLiquideDisponible,
  updateLiquideDisponible,
} = require("../Controllers/LiquideDisponible_controller");

const LiquideDisponibleRouter = express.Router();

LiquideDisponibleRouter.post("/create", createLiquideDisponible);
LiquideDisponibleRouter.get("/get", getLiquideDisponible);
LiquideDisponibleRouter.put("/update/:id", updateLiquideDisponible);

module.exports = LiquideDisponibleRouter;
