const BankCaisses = require("../Models/Bank_caisse_model");

exports.createBankcaisses = async (req, res) => {
  console.log(req.body);
  try {
    const bankcaisse = new BankCaisses(req.body);
    await bankcaisse.save();
    res
      .status(200)
      .send({ msg: "New Event  bankcaisse has been created", bankcaisse });
  } catch (error) {
    res.status(500).send({ msg: "Failed to create Caisse!", error });
  }
};

exports.getBankCaisses = async (req, res) => {
  try {
    const allBankCaisses = await BankCaisses.find();
    res.status(200).send({
      msg: "Event caisse list found!!",
      allBankCaisses: allBankCaisses,
    });
  } catch (error) {
    res.status(500).sent({ msg: "failed to find BankCaisses list!!" });
  }
};

exports.updateBankCaisses = async (req, res) => {
  const id = req.params.id;

  try {
    const bankcaisse = await BankCaisses.findByIdAndUpdate(id, {
      $set: req.body,
    });
    res.status(200).send({
      msg: "BankCaisse mise à jour avec succees",
      caisse_updated: bankcaisse,
    });
  } catch (error) {
    res.status(500).send({ msg: "Echec de l ajout" });
  }
};
