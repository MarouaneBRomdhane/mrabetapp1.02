const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Password: String,
    Role: { type: String },
    Salaire: { type: Number },
    SalairePerDay: { type: Number },
    SalaireForCurrentMonth: { type: Number },
    AvanceSurSalaire: [{ Montant: Number, date: String, etat: String }],
    DaysOfWorkPerMounth: { type: Number },
    DaysOffPerMounth: { type: Number },
    Absence: [{ date: String, justification: String, etat: String }],
    isAbscent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", usersSchema);
