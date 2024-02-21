// // User_Validation.js

// const { body, validationResult } = require("express-validator");

// const RegisterValidation = [
//   body(
//     "Password",
//     "Le mot de passe doit comporter au moins 8 caractères, avec au moins une lettre majuscule!"
//   ).isStrongPassword({
//     minLength: 8,
//     minLowercase: 1,
//   }),
// ];

// const Validation = (req, res, next) => {
//   const errors = validationResult(req);
//   if (errors.isEmpty()) {
//     next();
//   } else {
//     res.status(400).send({ errors: errors.array() });
//   }
// };

// module.exports = { RegisterValidation, Validation };
