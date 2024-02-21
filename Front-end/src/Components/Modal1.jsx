import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateCaisse1 } from "../Redux/Actions/Caisse1_Action";
import { getLiquide, updateLiquide } from "../Redux/Actions/Liquide_action";

const Modal1 = ({ caisse }) => {
  const [show, setShow] = useState(false);

  const [montant, setMontant] = useState("");
  const [montantLiquide, setmontantLiquide] = useState("");
  const [NumeroDeCheque, setNumeroDeCheque] = useState("");
  const [MontantDeCheque, setMontantDeCheque] = useState("");
  const [NumeroDeTransaction, setNumeroDeTransaction] = useState("");
  const [MontantDeTransaction, setMontantDeTransaction] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const disptach = useDispatch();

  useEffect(() => {
    disptach(getLiquide());
  }, [disptach]);

  const Liquide = useSelector((state) => state.Liquide.liquide);
  const Caisses = useSelector((state) => state.caisses1.caisses);

  const Cheques = Caisses.find((e) => e._id === caisse._id).Cheques;
  const Tpes = Caisses.find((e) => e._id === caisse._id).TPEs;

  const handleUpdateCaisse1 = () => {
    const updatedCaisse = {
      Recette: [{ montant }],
      Liquide: { montantLiquide },
      Cheques: [...caisse.Cheques],
      TPEs: [...caisse.TPEs],
    };

    disptach(updateCaisse1(caisse._id, updatedCaisse));
    disptach(
      updateLiquide(Liquide[0]._id, {
        LiquideDisponible:
          Number(Liquide[0].LiquideDisponible) + Number(montantLiquide),
      })
    );
    handleClose();
  };

  const handleSingleCheque = () => {
    if (NumeroDeCheque > 0 && MontantDeCheque > 0) {
      disptach(
        updateCaisse1(caisse._id, {
          ...caisse,
          Cheques: [...caisse.Cheques, { NumeroDeCheque, MontantDeCheque }],
        })
      );
      setMontantDeCheque("");
      setNumeroDeCheque("");
    }
  };

  const handleSingleTpe = () => {
    if (NumeroDeTransaction > 0 && MontantDeTransaction > 0) {
      disptach(
        updateCaisse1(caisse._id, {
          ...caisse,
          TPEs: [...caisse.TPEs, { NumeroDeTransaction, MontantDeTransaction }],
        })
      );
      setMontantDeTransaction("");
      setNumeroDeTransaction("");
    }
  };

  return (
    <div>
      {/* button to open modal */}
      <Button onClick={handleShow} className="BTN">
        Editer journée
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#FFF7D6", fontSize: "25px" }}>
                Recette
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserer le montant du ticket de caisse"
                autoFocus
                style={{ marginTop: "-10px" }}
                onChange={(e) => setMontant(e.target.value)}
                value={montant}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#FFF7D6", fontSize: "25px" }}>
                Espece
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserer le montant du liquide disponible en caisse"
                autoFocus
                style={{ marginTop: "-10px" }}
                onChange={(e) => setmontantLiquide(e.target.value)}
                value={montantLiquide}
              />
            </Form.Group>
          </Form>

          {/* FIelds to add single CHEQUE statments */}
          <Row style={{ marginTop: "20px" }}>
            <h5 style={{ color: "#FFF7D6", fontSize: "25px" }}>Cheques</h5>
          </Row>
          <Row style={{ marginTop: "-10px" }}>
            <Form.Label
              column
              md={6}
              sm={6}
              className="mb-0.5 mt-0.5 d-flex align-items-center"
              style={{ color: "#FFF7D6", fontSize: "18px" }}
            >
              Montant
              <Form.Control
                type="number"
                placeholder="Montant"
                style={{ marginLeft: "15px" }}
                onChange={(e) => setMontantDeCheque(e.target.value)}
                value={MontantDeCheque}
              />
            </Form.Label>
            <Form.Label
              column
              md={4}
              sm={4}
              className="mb-0.5 mt-0.5 d-flex align-items-center"
              style={{ color: "#FFF7D6", fontSize: "18px" }}
            >
              N°
              <Form.Control
                type="number"
                style={{ marginLeft: "15px" }}
                placeholder="N°"
                onChange={(e) => setNumeroDeCheque(e.target.value)}
                value={NumeroDeCheque}
              />
            </Form.Label>

            {/* Button on the same line to add signle CHEQUE statement*/}
            <Col md={2} sm={2} ml={1} className="d-flex align-items-center">
              <Button className="BTN-CHQTPE" onClick={handleSingleCheque}>
                Ajouter
              </Button>
            </Col>
          </Row>

          {/* Champs pour verifier les CHEQUES ajouter avant de valider la journer */}
          <div style={{ height: "100px", overflow: "auto" }}>
            {Cheques.map((cheque) => (
              <div
                key={cheque._id}
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
                    width: "80px",
                  }}
                >
                  Montant:
                </div>
                <div
                  style={{
                    marginTop: "-2px",
                    fontSize: "16px",
                    fontWeight: "500",
                    width: "160px",
                  }}
                >
                  {cheque.MontantDeCheque}
                </div>
                <div
                  style={{
                    marginTop: "-2px",
                    marginRight: "5px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  N°:
                </div>{" "}
                <div
                  style={{
                    marginTop: "-2px",
                    marginRight: "5px",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  {cheque.NumeroDeCheque}
                </div>
              </div>
            ))}
          </div>

          {/* FIelds to add single TPE statments */}
          <Row style={{ marginTop: "20px" }}>
            <h5 style={{ color: "#FFF7D6", fontSize: "25px" }}>TPE</h5>
          </Row>
          <Row style={{ marginTop: "-10px" }}>
            <Form.Label
              column
              md={6}
              sm={6}
              className="mb-0.5 mt-0.5 d-flex align-items-center"
              style={{ color: "#FFF7D6", fontSize: "18px" }}
            >
              Montant
              <Form.Control
                type="number"
                placeholder="Montant"
                style={{ marginLeft: "15px" }}
                onChange={(e) => setMontantDeTransaction(e.target.value)}
                value={MontantDeTransaction}
              />
            </Form.Label>
            <Form.Label
              column
              md={4}
              sm={4}
              className="mb-0.5 mt-0.5 d-flex align-items-center"
              style={{ color: "#FFF7D6", fontSize: "18px" }}
            >
              N°
              <Form.Control
                type="number"
                style={{ marginLeft: "15px" }}
                placeholder="N°"
                onChange={(e) => setNumeroDeTransaction(e.target.value)}
                value={NumeroDeTransaction}
              />
            </Form.Label>
            {/* Button on the same line to add signle TPE statement*/}
            <Col md={2} sm={2} className="d-flex align-items-center">
              <Button className="BTN-CHQTPE" onClick={handleSingleTpe}>
                Ajouter
              </Button>
            </Col>
          </Row>

          {/*Champs pour verifier les TPEs ajouter avant de valider la journer  */}
          <div style={{ height: "100px", overflow: "auto" }}>
            {Tpes.map((tpe) => (
              <div
                key={tpe._id}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "10px",
                  borderBottom: "1px solid  #FFF7D6",
                  paddingBottom: "5px",
                }}
              >
                <div
                  style={{
                    marginRight: "5px",
                    marginTop: "-2px",
                    fontWeight: "bold",
                    fontSize: "17px",
                    width: "80px",
                  }}
                >
                  Montant:
                </div>
                <div
                  style={{
                    marginTop: "-2px",
                    fontSize: "17px",
                    fontWeight: "500",
                    width: "160px",
                  }}
                >
                  {tpe.MontantDeTransaction}
                </div>
                <div
                  style={{
                    marginTop: "-2px",
                    marginRight: "5px",
                    fontSize: "17px",
                    fontWeight: "bold",
                  }}
                >
                  N°:
                </div>{" "}
                <div
                  style={{
                    marginTop: "-2px",
                    marginRight: "5px",
                    fontSize: "17px",
                    fontWeight: "500",
                  }}
                >
                  {tpe.NumeroDeTransaction}
                </div>
              </div>
            ))}
          </div>

          {/* Uploader les image scanner des ticket de caisse */}
          <Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label
                style={{
                  color: "#FFF7D6",
                  fontSize: "25px",
                  marginTop: "10px",
                }}
              >
                Ticket de caisse
              </Form.Label>
              <Form.Control
                type="file"
                placeholder="Inserer le montant du ticket de caisse"
                autoFocus
                style={{ marginTop: "-10px" }}
              />
            </Form.Group>
          </Row>
        </Modal.Body>

        <Modal.Footer style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}>
          {/* boutton pour valider la journée */}
          <Button className="BTN" onClick={handleUpdateCaisse1}>
            Sauvegareder
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Modal1;
