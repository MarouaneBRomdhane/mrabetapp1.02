const Histories = require("../Models/History_model");

exports.getHistory = async (req, res) => {
  try {
    const allHistories = await Histories.find();
    res.status(200).send({ msg: "History list found!!", allHistories });
  } catch (error) {
    res.status(500).sent({ msg: "failed to find Caisses list!!" });
  }
};
