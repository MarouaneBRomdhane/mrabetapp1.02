import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { TbBrandCashapp } from "react-icons/tb";
import { updateUser } from "../Redux/Actions/Users_Action";
import { useDispatch } from "react-redux";

const Avance_Approuvement = ({ selectedUser }) => {
  const [showAvanceModal, setShowAvanceModal] = useState(false);

  const dispatch = useDispatch();

  const handleAvanceModalShow = () => {
    setShowAvanceModal(true);
  };
  const handleAvanceModalClose = () => {
    setShowAvanceModal(false);
  };

  const handleAvanceApprouvée = () => {
    const updatedUser = {
      ...selectedUser,
      SalaireForCurrentMonth:
        selectedUser.SalaireForCurrentMonth -
        selectedUser.AvanceSurSalaire.reduce(
          (acc, e) => (e.etat === "attente" ? acc + e.Montant : acc + 0),
          0
        ),

      AvanceSurSalaire: selectedUser.AvanceSurSalaire.map((avance) =>
        avance.etat === "attente" ? { ...avance, etat: "approuvée" } : avance
      ),
    };

    dispatch(updateUser(selectedUser._id, updatedUser));
    handleAvanceModalClose();
  };

  const handleAvanceRefuser = () => {
    const updatedUser = {
      ...selectedUser,
      AvanceSurSalaire: selectedUser.AvanceSurSalaire.map((avance) =>
        avance.etat === "attente" ? { ...avance, etat: "refusée" } : avance
      ),
    };

    dispatch(updateUser(selectedUser._id, updatedUser));
    handleAvanceModalClose();
  };

  return (
    <>
      {selectedUser.AvanceSurSalaire.some(
        (avance) => avance.etat === "attente"
      ) ? (
        <TbBrandCashapp color="red" size={45} onClick={handleAvanceModalShow} />
      ) : (
        <TbBrandCashapp color="#FFF7D6" size={45} />
      )}
      <Modal show={showAvanceModal} onHide={handleAvanceModalClose}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}
        >
          <Modal.Title>Demande D'avance sur Salaire pour</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}>
          {/* Display the list of avance with etat === 'attente' */}
          {selectedUser.AvanceSurSalaire.filter(
            (avance) => avance.etat === "attente"
          ).map((avance) => (
            <div key={avance._id}>
              <p>Montant: {avance.Montant}</p>
              <p>Date: {avance.date}</p>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}>
          <Button variant="danger" onClick={handleAvanceRefuser}>
            Refuser
          </Button>
          <Button className="BTN" onClick={handleAvanceApprouvée}>
            Approuver
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Avance_Approuvement;
