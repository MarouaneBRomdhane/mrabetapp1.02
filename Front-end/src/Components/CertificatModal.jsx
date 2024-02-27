import React, { useState } from "react";
import { Button, Carousel, Modal } from "react-bootstrap";
import { IoIosEye } from "react-icons/io";
import { useDispatch } from "react-redux";
import { updateUser } from "../Redux/Actions/Users_Action";

const CertificatModal = ({ selectedUser }) => {
  const [showCertificatModal, setShowCertificatModal] = useState(false);

  const dispatch = useDispatch();

  const handleCertificatModalShow = () => {
    setShowCertificatModal(true);
  };
  const handleCertificatModalClose = () => {
    setShowCertificatModal(false);
  };

  const handleCertificatApprouvée = () => {
    const updatedUser = {
      ...selectedUser,
      Absence: selectedUser.Absence.map((absence) =>
        absence.etat === "attente" ? { ...absence, etat: "approuvée" } : absence
      ),
    };

    dispatch(updateUser(selectedUser._id, updatedUser));
    handleCertificatModalClose();
  };

  const handleCertificatRefusée = () => {
    const updatedUser = {
      ...selectedUser,
      Absence: selectedUser.Absence.map((absence) =>
        absence.etat === "attente" ? { ...absence, etat: "Refusée" } : absence
      ),
    };

    dispatch(updateUser(selectedUser._id, updatedUser));
    handleCertificatModalClose();
  };

  return (
    <>
      <IoIosEye size={45} color="#FFF7D6" onClick={handleCertificatModalShow} />
      <Modal show={showCertificatModal} onHide={handleCertificatModalClose}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}
        >
          <Modal.Title>Certificat Medical</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}>
          {/* Display the Certificat */}
          <Carousel>
            {selectedUser.Absence.filter(
              (absence) => absence.etat === "attente"
            ).map((absence) => (
              <Carousel.Item key={absence._id}>
                <img
                  className="d-block w-100"
                  alt=""
                  src={absence.justification}
                  style={{
                    cursor: "pointer",
                    width: "300px",
                    height: "100%",
                    borderRadius: "10px",
                  }}
                />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}>
          <Button variant="danger" onClick={handleCertificatRefusée}>
            Refuser
          </Button>
          <Button className="BTN" onClick={handleCertificatApprouvée}>
            {" "}
            Approuver
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CertificatModal;
