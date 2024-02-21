const LiquideDisponible = require("../Models/LiquideDisponible");

exports.createLiquideDisponible = async (req, res) => {
  console.log(req.body);
  try {
    const liquide = new LiquideDisponible(req.body);
    await liquide.save();
    res.status(200).send({ msg: "New caisse has been created", liquide });
  } catch (error) {
    res.status(500).send({ msg: "Failed to create Caisse!", error });
  }
};

exports.getLiquideDisponible = async (req, res) => {
  try {
    const Liquide = await LiquideDisponible.find();
    res
      .status(200)
      .send({ msg: "Liquide list found!!", LiquideDisponible: Liquide });
  } catch (error) {
    res.status(500).sent({ msg: "failed to find liquide list!!" });
  }
};

exports.updateLiquideDisponible = async (req, res) => {
  const id = req.params.id;

  try {
    const Liquide = await LiquideDisponible.findByIdAndUpdate(id, {
      $set: req.body,
    });
    res.status(200).send({
      msg: "Liquide mise à jour avec succees",
      Liquide_updated: Liquide,
    });
  } catch (error) {
    res.status(500).send({ msg: "Echec de l ajout" });
  }
};
