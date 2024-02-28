import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
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
          style={{
            backgroundColor: "rgba(0, 126, 127, 0.75)",
          }}
        >
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "rgba(0, 126, 127, 0.75)",
            overflow: "auto",
            maxHeight: "80vh",
          }}
        >
          <h3>Liste des avances</h3>
          <div>
            {selectedUser.AvanceSurSalaire.map((avance) => (
              <div
                key={avance._id}
                style={{
                  border: "solid 1px #FFF7D6",
                  borderRadius: "7px",
                  marginBottom: "1.5%",
                  color: "#FFF7D6",
                  display: "flex",
                  justifyContent: "center",
                  gap: "3%",
                  fontWeight: "500",
                  fontSize: "17px",
                }}
                className="divMta3userlist"
              >
                <div style={{ width: "30%" }}> {avance.date} </div>
                <div style={{ width: "30%" }}> {avance.Montant}dt </div>
                <div style={{ width: "30%" }}> {avance.etat} </div>
              </div>
            ))}
          </div>
          <h3 style={{ marginTop: "2%" }}>Liste des abscences</h3>
          <div>
            {selectedUser.Absence.map((abscence) => (
              <div
                key={abscence._id}
                style={{
                  border: "solid 1px #FFF7D6",
                  borderRadius: "7px",
                  marginBottom: "1.5%",
                  color: "#FFF7D6",
                  display: "flex",
                  justifyContent: "center",
                  gap: "3%",
                  fontWeight: "500",
                  fontSize: "17px",
                }}
                className="dashcardtitle"
              >
                <div style={{ width: "25%" }}> {abscence.date} </div>
                <div style={{ width: "45%" }}>
                  {" "}
                  {abscence.justification !== "Absence non justifiée"
                    ? "Absence justifiée"
                    : abscence.justification}
                </div>
                <div style={{ width: "25%", marginRight: "-2%" }}>
                  {" "}
                  {abscence.etat}{" "}
                </div>
              </div>
            ))}{" "}
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}
        ></Modal.Footer>
      </Modal>
    </>
  );
};

export default CertificatModal;
