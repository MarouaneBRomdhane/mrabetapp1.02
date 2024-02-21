const Products = require("../Models/Achat_model");

exports.createProduct = async (req, res) => {
  console.log(req.body);
  try {
    const product = new Products(req.body);
    const savedProduct = await product.save();
    res
      .status(201)
      .send({ msg: "New Product has been created", product: savedProduct });
  } catch (error) {
    console.error("Failed to create product!", error);
    res.status(500).send({ msg: "Failed to create product!", error });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const allProducts = await Products.find();
    res
      .status(200)
      .send({ msg: "Products list found!!", allProducts: allProducts });
  } catch (error) {
    res.status(500).sent({ msg: "failed to find Products list!!" });
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Products.findByIdAndUpdate(id, { $set: req.body });
    res.status(200).send({
      msg: "Produit mise à jour avec succees",
      product_updated: product,
    });
  } catch (error) {
    res.status(500).send({ msg: "Echec de l update" });
  }
};
