const Caisses = require("../Models/Caisse_event_model");

exports.createCaisseEvent = async (req, res) => {
  console.log(req.body);
  try {
    const caisse = new Caisses(req.body);
    await caisse.save();
    res.status(200).send({ msg: "New Event caisse has been created", caisse });
  } catch (error) {
    res.status(500).send({ msg: "Failed to create Caisse!", error });
  }
};

exports.getCaisseEvent = async (req, res) => {
  try {
    const allCaisses = await Caisses.find();
    res
      .status(200)
      .send({ msg: "Event caisse list found!!", allCaisses: allCaisses });
  } catch (error) {
    res.status(500).sent({ msg: "failed to find Caisses list!!" });
  }
};

exports.updateCaissesEvent = async (req, res) => {
  const id = req.params.id;

  try {
    const caisse = await Caisses.findByIdAndUpdate(id, { $set: req.body });
    res.status(200).send({
      msg: "Journéé mise à jour avec succees",
      caisse_updated: caisse,
    });
  } catch (error) {
    res.status(500).send({ msg: "Echec de l ajout" });
  }
};
