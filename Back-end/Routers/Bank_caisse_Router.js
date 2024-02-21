const express = require("express");
const {
  createBankcaisses,
  getBankCaisses,
  updateBankCaisses,
} = require("../Controllers/Bank_caisse_controller");

const BankCaisseRouter = express.Router();

BankCaisseRouter.post("/create", createBankcaisses);
BankCaisseRouter.get("/get", getBankCaisses);
BankCaisseRouter.put("/update/:id", updateBankCaisses);

module.exports = BankCaisseRouter;
