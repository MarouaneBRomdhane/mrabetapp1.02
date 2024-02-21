const express = require("express");
const {
  createCaisseEvent,
  getCaisseEvent,
  updateCaissesEvent,
} = require("../Controllers/Caisse_event_controller");

const CaisseEventRouter = express.Router();

CaisseEventRouter.post("/create", createCaisseEvent);
CaisseEventRouter.get("/get", getCaisseEvent);
CaisseEventRouter.put("/update/:id", updateCaissesEvent);

module.exports = CaisseEventRouter;
