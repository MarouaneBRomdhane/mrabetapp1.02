import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { TbBrandCashapp } from "react-icons/tb";
import { updateUser } from "../Redux/Actions/Users_Action";
import { useDispatch } from "react-redux";

const Avance_Approuvement = ({ selectedUser }) => {
  const [showAvanceModal, setShowAvanceModal] = useState(false);
  const [Avance, setAvance] = useState("");

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const FullDate = [day, month, year].join("/");

  const dispatch = useDispatch();

  const handleAvanceModalShow = () => {
    setShowAvanceModal(true);
  };
  const handleAvanceModalClose = () => {
    setShowAvanceModal(false);
  };

  const handleAvance = () => {
    const avanceObject = { Montant: Avance, date: FullDate, etat: "attente" };

    const updatedUserAvance = {
      ...selectedUser,
      AvanceSurSalaire: [...selectedUser.AvanceSurSalaire, avanceObject],
      SalaireForCurrentMonth: selectedUser.SalaireForCurrentMonth - Avance,
    };

    dispatch(updateUser(selectedUser._id, updatedUserAvance));
    setAvance("");
    handleAvanceModalClose();
  };

  return (
    <>
      <TbBrandCashapp
        color="#FFF7D6"
        size={45}
        onClick={handleAvanceModalShow}
      />
      <Modal show={showAvanceModal} onHide={handleAvanceModalClose}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}
        >
          <Modal.Title>Demande D'avance sur Salaire pour</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}>
          <Form>
            <Form.Group className=" mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#FFF7D6", fontSize: "25px" }}>
                Montant de l'avance
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Example 100 pour avoire 100dt"
                autoFocus
                value={Avance}
                onChange={(e) => setAvance(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}>
          <Button
            style={{ alignSelf: "center" }}
            className=" dashbtn BTN"
            onClick={handleAvance}
          >
            {" "}
            Soumettre
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Avance_Approuvement;
