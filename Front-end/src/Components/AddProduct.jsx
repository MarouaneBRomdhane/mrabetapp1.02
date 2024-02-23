import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../Redux/Actions/Achat_Action";
import { getLiquide, updateLiquide } from "../Redux/Actions/Liquide_action";
import { Row } from "react-bootstrap";

const AddProduct = () => {
  const [show, setShow] = useState(false);
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Facture, setFacture] = useState("");
  const [Affectation, setAffectation] = useState("");
  const [Unity, setUnity] = useState("");
  const [Pâtisserie, setPâtisserie] = useState("");
  const [Pizzeria, setPizzeria] = useState("");
  const [Cuisine, setCuisine] = useState("");
  const [Bar, setBar] = useState("");

  const [temporaryProduct, setTemporaryProduct] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLiquide());
  }, [dispatch]);

  const Liquide = useSelector((state) => state.Liquide.liquide);

  const product = useSelector((state) => state.Products.products);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addSingleProduct = () => {
    // Condition t'obligi el user bech i3abi les state el kol

    if (!Name || !Price || !Quantity) {
      alert("Please fill in all the fields.");
      return;
    }
    if (
      Number(Cuisine) + Number(Pizzeria) + Number(Pâtisserie) + Number(Bar) !=
        Quantity &&
      Affectation === "Commune"
    ) {
      alert(
        "Les quantités affectées sont erronées ! Merci de les re-vérifier."
      );
      return;
    }
    const newTemporaryProduct =
      Affectation !== "Commune"
        ? {
            Name: Name,
            Quantity: Quantity,
            Price: Price,
            Unity: Unity,
            UnitPrice: (Quantity / Price).toFixed(3),
            Affectation: Affectation,
            Cuisine: 0,
            Pizzeria: 0,
            Bar: 0,
            Pâtisserie: 0,
          }
        : {
            Name: Name,
            Quantity: Quantity,
            Price: Price,
            Unity: Unity,
            UnitPrice: (Price / Quantity).toFixed(3),
            Affectation: Affectation,
            Cuisine: Cuisine,
            Pizzeria: Pizzeria,
            Bar: Bar,
            Pâtisserie: Pâtisserie,
          };
    setTemporaryProduct([...temporaryProduct, newTemporaryProduct]);
    setName("");
    setQuantity(0);
    setPrice(0);
    setCuisine("");
    setBar("");
    setPizzeria("");
    setPâtisserie("");
  };

  const handleAddProduct = () => {
    const newProduct = {
      Facture: Facture,
      Product: temporaryProduct,
    };

    dispatch(addProducts(newProduct));

    dispatch(
      updateLiquide(Liquide[0]._id, {
        LiquideDisponible:
          Number(Liquide[0].LiquideDisponible) -
          temporaryProduct.reduce((acc, e) => acc + Number(e.Price), 0),
      })
    );
    setName("");
    setQuantity("");
    setPrice("");
    setFacture("");
    setTemporaryProduct([]);
    handleClose();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataUri = e.target.result;
        setFacture(dataUri);
        console.log(dataUri);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {/* button to open modal */}
      <Button   id="addproduct" onClick={handleShow} className="BTN">
        Ajouter un Achat
      </Button>

      {/* MODAL */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}
        >
          <Modal.Title style={{ color: "#FFF7D6" }}>Journée du</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}>
          <Form>
            {/* Uploader l'image scanner de la FACTURE*/}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label
                style={{
                  color: "#FFF7D6",
                  fontSize: "25px",
                  marginTop: "10px",
                }}
              >
                Facture
              </Form.Label>
              <Form.Control
                onChange={(e) => handleImageChange(e)}
                type="file"
                placeholder="Inserer le montant du ticket de caisse"
                autoFocus
                style={{ marginTop: "-10px" }}
                accept="image/*"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#FFF7D6", fontSize: "25px" }}>
                Nom du produit
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Tapez le nom du produit"
                autoFocus
                style={{ marginTop: "-10px" }}
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#FFF7D6", fontSize: "25px" }}>
                Quantité
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Veuillez fournir la quantité achetée"
                autoFocus
                style={{ marginTop: "-10px" }}
                value={Quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setUnity(e.target.value)}
              value={Unity}
            >
              <option>Veuillez sélectionner le type d'unité</option>
              <option value="Lt">Litre</option>
              <option value="Kg">Kg</option>
              <option value="Pck">Pack</option>
            </Form.Select>

            <Form.Select
              style={{ marginTop: "15px" }}
              aria-label="Default select example"
              onChange={(e) => setAffectation(e.target.value)}
              value={Affectation}
            >
              <option>Veuillez sélectionner l'affectation</option>
              <option value="Cuisine">Cuisine</option>
              <option value="Pizzeria">Pizzeria</option>
              <option value="Pâtisserie">Pâtisserie</option>
              <option value="Bar">Bar</option>
              <option value="Commune">Commune</option>
            </Form.Select>
            {Affectation === "Commune" ? (
              <Row
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1%",
                  marginTop: "15px",
                  width: "95%",
                  justifyContent: "center",
                  marginLeft: "2.5%",
                }}
              >
                <Form.Control
                  type="number"
                  placeholder="Cuisine"
                  autoFocus
                  value={Cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  style={{ flex: "1" }}
                />
                <Form.Control
                  type="number"
                  placeholder="Pizzeria"
                  value={Pizzeria}
                  onChange={(e) => setPizzeria(e.target.value)}
                  autoFocus
                  style={{ flex: "1" }}
                />
                <Form.Control
                  type="number"
                  placeholder="Pâtisserie"
                  value={Pâtisserie}
                  onChange={(e) => setPâtisserie(e.target.value)}
                  autoFocus
                  style={{ flex: "1" }}
                />
                <Form.Control
                  type="number"
                  placeholder="Bar"
                  value={Bar}
                  onChange={(e) => setBar(e.target.value)}
                  autoFocus
                  style={{ flex: "1" }}
                />
              </Row>
            ) : null}

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#FFF7D6", fontSize: "25px" }}>
                Prix
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Veuillez fournir le prix payé pour le produit"
                autoFocus
                style={{ marginTop: "-10px" }}
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            {/* Button on the same line to add signle PRODUCT */}

            <Button
            id="btnajouter"
              className="BTN-CHQTPE"
              onClick={addSingleProduct}
              style={{ marginLeft: "375px", marginBottom: "20px" }}
            >
              Ajouter
            </Button>

            {/* Champs pour verifier les PRODUIT ajouter avant de valider l'ajout */}
            <div style={{ height: "100px", overflow: "auto" }}>
              {temporaryProduct.map((product) => (
                <div
                  key={product._id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "8px",
                    borderBottom: "1px solid #FFF7D6",
                    paddingBottom: "5px",
                  }}
                >
                  <div
                    style={{
                      marginRight: "5px",
                      marginTop: "-2px",
                      fontWeight: "bold",
                      fontSize: "16px",
                      width: "180px",
                    }}
                  >
                    {product.Name}
                  </div>
                  <div
                    style={{
                      marginTop: "-2px",
                      marginRight: "5px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      width: "150px",
                    }}
                  >
                    {product.Quantity}
                    {product.Unity}
                  </div>{" "}
                  <div
                    style={{
                      marginTop: "-2px",
                      marginRight: "5px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {product.Price}dt
                  </div>
                </div>
              ))}
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}>
          {/* boutton pour valider la journée */}
          <Button className="BTN-CHQTPE" onClick={handleAddProduct}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddProduct;