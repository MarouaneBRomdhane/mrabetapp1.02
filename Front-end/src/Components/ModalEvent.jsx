import React from "react";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateCaisseEvent } from "../Redux/Actions/CaisseEvent_Actions";

const ModalEvent = ({ caisse }) => {
  const [montant, setMontant] = useState("");
  const [montantLiquide, setmontantLiquide] = useState("");
  const [NumeroDeCheque, setNumeroDeCheque] = useState("");
  const [MontantDeCheque, setMontantDeCheque] = useState("");
  const [NumeroDeTransaction, setNumeroDeTransaction] = useState("");
  const [MontantDeTransaction, setMontantDeTransaction] = useState("");

  const [selectedOption, setSelectedOption] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const disptach = useDispatch();

  const Caisses = useSelector((state) => state.caissesEvent.caisses);

  const Cheques = Caisses.find((e) => e._id === caisse._id).Cheques;
  const Tpes = Caisses.find((e) => e._id === caisse._id).TPEs;

  const handleUpdateCaisseEvent = () => {
    const updatedCaisse = {
      Recette: [{ montant }],
      Liquide: { montantLiquide },
      Cheques: [...caisse.Cheques],
      TPEs: [...caisse.TPEs],
    };

    disptach(updateCaisseEvent(caisse._id, updatedCaisse)).then(() => {
      handleClose();
    });
  };

  const handleSingleCheque = () => {
    if (NumeroDeCheque > 0 && MontantDeCheque > 0) {
      disptach(
        updateCaisseEvent(caisse._id, {
          ...caisse,
          Cheques: [...caisse.Cheques, { NumeroDeCheque, MontantDeCheque }],
        })
      );
      setMontantDeCheque(0);
      setNumeroDeCheque(0);
    }
  };

  const handleSingleTpe = () => {
    if (NumeroDeTransaction > 0 && MontantDeTransaction > 0) {
      disptach(
        updateCaisseEvent(caisse._id, {
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
        Ajouter Evenement
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
          {/* field mta3 RECETTE */}
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

          {/* select Bech el modal ya3ref ech irander  */}
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setSelectedOption(e.target.value)}
            value={selectedOption}
          >
            <option>Veuillez sélectionner le type de transaction</option>
            <option value="1">Espece</option>
            <option value="2">Cheque</option>
            <option value="3">Tpe</option>
          </Form.Select>

          {/* IF el user iselecti ESPECE */}
          {selectedOption === "1" && (
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
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
          )}

          {/* IF el user iselecti Cheque */}
          {selectedOption === "2" && (
            <div>
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
            </div>
          )}

          {/* IF user iselcti TPE */}
          {selectedOption === "3" && (
            <div>
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
            </div>
          )}

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
          <Button className="BTN" onClick={handleUpdateCaisseEvent}>
            Sauvegareder
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalEvent;
