const Users = require("../Models/Users_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.Register = async (req, res) => {
  const {
    Name,
    Password,
    Role,
    Salaire,
    AvanceSurSalaire,
    DaysOfWorkPerMounth,
    DaysOffPerMounth,
    Nombredabsence,
    isAbscent,
    Absence,
  } = req.body;
  try {
    const found = await Users.findOne({ Name });

    if (found) {
      res.status(400).send({ msg: "The user you want to add aleready exist" });
    } else {
      const NewPassword = bcrypt.hashSync(Password, 10); //password hashed x10
      const SalairePerDay = Salaire / DaysOfWorkPerMounth; // Calculate SalairePerDay
      const User = new Users({
        Name,
        Password: NewPassword,
        Role,
        Salaire,
        SalairePerDay,
        AvanceSurSalaire,
        DaysOfWorkPerMounth,
        DaysOffPerMounth,
        Nombredabsence,
        isAbscent,
        SalaireForCurrentMonth: Salaire,
        Absence,
      });
      const SecretKey = "160592050199271021";
      const Token = jwt.sign({ id: User._id }, SecretKey);
      await User.save();
      res.status(200).send({
        msg: "Utilisateur ajouté avec succès à la base de données.",
        User,
        Token,
      });
    }
  } catch (error) {
    res.status(500).send(error);
    if (error) throw error;
  }
};

exports.Login = async (req, res) => {
  const { Name, Password } = req.body;
  try {
    const found = await Users.findOne({ Name });
    if (!found) {
      res
        .status(400)
        .send({ errors: [{ msg: "nom d'utilisateur incorrect" }] });
    } else {
      const ComparedPassword = bcrypt.compareSync(Password, found.Password);
      if (!ComparedPassword) {
        res.status(400).send({ errors: [{ msg: "mot de passe incorrect!!" }] });
      } else {
        const SecretKey = "160592050199271021";
        const Token = jwt.sign({ id: found._id }, SecretKey, {
          expiresIn: "6h",
        });

        res
          .status(200)
          .send({ msg: "Connecté avec succès!!", User: found, Token });
      }
    }
  } catch (error) {
    res.status(500).send(error);
    if (error) throw error;
  }
};
exports.GetCurrent = (req, res) => {
  res.status(200).send({ user: req.user });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    Name,
    Role,
    Salaire,
    DaysOfWorkPerMounth,
    DaysOffPerMounth,
    Nombredabsence,
    isAbscent,
    SalaireForCurrentMonth,
    AvanceSurSalaire,
    Absence,
  } = req.body;

  try {
    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.Name = Name || user.Name;
    user.Role = Role || user.Role;
    user.Salaire = Salaire || user.Salaire;
    user.DaysOfWorkPerMounth = DaysOfWorkPerMounth || user.DaysOfWorkPerMounth;
    user.DaysOffPerMounth = DaysOffPerMounth || user.DaysOffPerMounth;
    user.Nombredabsence = Nombredabsence || user.Nombredabsence;
    user.isAbscent = isAbscent;
    user.SalaireForCurrentMonth = SalaireForCurrentMonth;
    user.AvanceSurSalaire = AvanceSurSalaire;
    user.Absence = Absence;

    await user.save();

    res.status(200).json({ msg: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
    if (error) throw error;
  }
};
