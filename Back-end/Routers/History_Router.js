const express = require("express");

const { getHistory } = require("../Controllers/History_controller");

const HistoryRouter = express.Router();

HistoryRouter.get("/get", getHistory);

module.exports = HistoryRouter;
