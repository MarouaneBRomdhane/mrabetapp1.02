const users = require("../Models/Users_model");
const jwt = require("jsonwebtoken");
exports.IsAuth = async (req, res, next) => {
  const Token = req.header("Token");
  console.log(Token);
  try {
    const secretKey = "160592050199271021";
    const Verify = jwt.verify(Token, secretKey); //when we use jwt we always have to call the secretKey with the token
    if (!Verify) {
      res.status(400).send({ mesg: "you're not authorized" });
    } else {
      const user = await users.findById(Verify.id); //get the object user witch has that id
      req.user = user; //we give it to the req.user witch we use in the GetCurrent function in the controller .js
      next();
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
