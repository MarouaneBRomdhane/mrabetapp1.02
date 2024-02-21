const express = require("express");
const {
  Register,
  Login,
  GetCurrent,
  getUsers,
  updateUser,
} = require("../Controllers/Users_controller");

const { IsAuth } = require("../Middleware/IsAuth");

const UsersRouter = express.Router();

UsersRouter.post("/Register", Register);
UsersRouter.post("/Login", Login);
UsersRouter.get("/get", getUsers);
UsersRouter.get("/getCurrentUser", IsAuth, GetCurrent);
UsersRouter.put("/update/:id", updateUser);

module.exports = UsersRouter;
