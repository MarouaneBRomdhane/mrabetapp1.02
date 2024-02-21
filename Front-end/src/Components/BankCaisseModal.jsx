import React from "react";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateBankCaisse } from "../Redux/Actions/Bank_Caisses_Action";

const BankCaisseModal = ({ caisse }) => {
  const [show, setShow] = useState(false);
  const [Montant, setMontant] = useState("");
  const [Motif, setMotif] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const Caisses = useSelector((state) => state.BankCaisses.BankCaisses);

  const handleUdateBankCaisse = () => {
    const updatedCaisse = {
      Montant: Montant,
      Motif: Motif,
    };

    dispatch(updateBankCaisse(caisse._id, updatedCaisse)).then(() => {
      handleClose();
    });
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
          <Modal.Title style={{ color: "#FFF7D6" }}>Retrait du</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#FFF7D6", fontSize: "25px" }}>
                Montant
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserer le montant du retrait"
                autoFocus
                style={{ marginTop: "-10px" }}
                value={Montant}
                onChange={(e) => setMontant(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label style={{ color: "#FFF7D6", fontSize: "25px" }}>
                Motif
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                on
                onChange={(e) => setMotif(e.target.value)}
              />
            </Form.Group>
          </Form>

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
          <Button className="BTN" onClick={handleUdateBankCaisse}>
            Sauvegareder
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BankCaisseModal;
