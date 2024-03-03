import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Modal from "react-bootstrap/Modal";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrent,
  getUsers,
  updateUser,
} from "../Redux/Actions/Users_Action";
import Avance_Approuvement from "./Avance_Approuvement";
import CertificatModal from "./CertificatModal";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrent());
    dispatch(getUsers());
  }, [dispatch]);

  const user = useSelector((state) => state.users.user);
  const users = useSelector((state) => state.users.users);

  const currentHrs = new Date().getHours();
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const FullDate = [day, month, year].join("/");

  const [show, setShow] = useState(false);
  const [Justification, setJustification] = useState("");
  const [Deduire, setDeduire] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (selectedUser) => {
    setSelectedUser(selectedUser);
    setShow(true);
  };

  const handleIsAbscent = () => {
    if (Justification === "non" && Deduire === "salaire") {
      const updatedUser = {
        ...selectedUser,
        isAbscent: true,
        SalaireForCurrentMonth:
          selectedUser.SalaireForCurrentMonth - selectedUser.SalairePerDay,
        Absence: [
          ...selectedUser.Absence,
          {
            date: FullDate,
            justification: "Absence non justifiée",
            etat: "refusée",
          },
        ],
      };
      dispatch(updateUser(selectedUser._id, updatedUser));
    }

    if (Justification === "non" && Deduire === "congé") {
      const updatedUser = {
        ...selectedUser,
        isAbscent: true,
        DaysOffPerMounth: selectedUser.DaysOffPerMounth - 1,
        Absence: [
          ...selectedUser.Absence,
          {
            date: FullDate,
            justification: "Absence non justifiée",
            etat: "refusée",
          },
        ],
      };
      dispatch(updateUser(selectedUser._id, updatedUser));
    } else {
      const updatedUser = { ...selectedUser, isAbscent: true };
      dispatch(updateUser(selectedUser._id, updatedUser));
    }
    handleClose();
    setJustification("");
    setDeduire("");
    setSelectedUser(null);
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          width: "20%",
          backgroundColor: "rgba(0, 126, 127, 0.75)",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          marginTop: "20px",
          color: "#FFF7D6",
          textAlign: "center",
        }}
        className="greeting"
      >
        <h1>
          {" "}
          {currentHrs < 15
            ? `Bonjour ${user.Name}`
            : currentHrs >= 15 && currentHrs < 20
            ? `Bonne après-midi ${user.Name}`
            : ` Bonsoir ${user.Name}`}
        </h1>
      </div>
      <div
        style={{
          width: "95%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          marginTop: "20px",
          color: "#FFF7D6",
          gap: "1%",
        }}
      ></div>

      {/* DIV MTA3 DEUXIEME LIGNE */}

      {user.Role === "Patron" ||
      user.Role === "finance" ||
      user.Role === "gerant" ? (
        <div
          className="div2ligne"
          style={{
            width: "98%",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            margin: "auto",
            marginTop: "20px",
            color: "#FFF7D6",
            gap: "1%",
          }}
        >
          <Card
            style={{
              width: "100%",
              backgroundColor: "rgba(0, 126, 127, 0.75)",
              borderRadius: "10px",
              height: "500px",

              marginBottom: "10px",
              overflow: "auto",
            }}
            className="personal-list"
          >
            <Card.Body>
              <Card.Title
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#FFF7D6",
                  fontSize: "30px",
                  fontWeight: "700",
                }}
              >
                Liste du personnel
              </Card.Title>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {users.map((selectedUser) => (
                  <div
                    key={selectedUser._id}
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      gap: "2%",
                      border: "1px solid #FFF7D6",
                      borderRadius: "8px",
                      width: "95%",
                    }}
                    className="divMta3userlist"
                  >
                    <div
                      style={{
                        marginBottom: "10px",
                        padding: "5px",
                        width: "20%",
                      }}
                      className="userspersonel"
                    >
                      <p
                        style={{
                          margin: 0,
                          fontWeight: "bold",
                          fontSize: "20px",
                          color: "#FFF7D6",
                        }}
                      >
                        {selectedUser.Name}
                      </p>
                      <p1
                        style={{
                          margin: 0,
                          color: "#FFF7D6",
                          fontWeight: "500",
                        }}
                      >
                        {selectedUser.Role === "user"
                          ? "Simple Employer"
                          : selectedUser.Role}
                      </p1>
                    </div>
                    <div
                      style={{
                        marginBottom: "10px",
                        padding: "5px",
                        width: "20%",
                      }}
                      className="soldeconge"
                    >
                      <p
                        style={{
                          margin: 0,
                          fontWeight: "bold",
                          fontSize: "20px",
                          color: "#FFF7D6",
                        }}
                      >
                        Solde de congé
                      </p>
                      <p
                        style={{
                          margin: 0,
                          color: "#FFF7D6",
                          fontWeight: "500",
                          fontSize: "20px",
                        }}
                      >
                        {selectedUser.DaysOffPerMounth}
                      </p>
                    </div>

                    <div
                      style={{
                        marginBottom: "10px",
                        padding: "5px",
                        width: "20%",
                      }}
                    >
                      <p
                        className="soldeconge"
                        style={{
                          margin: 0,
                          fontWeight: "bold",
                          fontSize: "20px",
                          color: "#FFF7D6",
                        }}
                      >
                        Salaire de ce mois
                      </p>
                      <p
                        className="soldeconge"
                        style={{
                          margin: 0,
                          color: "#FFF7D6",
                          fontWeight: "500",
                          fontSize: "20px",
                        }}
                      >
                        {selectedUser.SalaireForCurrentMonth.toFixed(3)}
                      </p>
                    </div>

                    <div
                      style={{
                        width: "40%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        gap: "1.5%",
                      }}
                      className="logos"
                    >
                      <div
                        className=" toggle-button-cover"
                        style={{ marginTop: "3%", width: "13%" }}
                      >
                        <div id="button-3" className=" button r">
                          <input
                            className="checkbox"
                            type="checkbox"
                            defaultChecked={selectedUser.isAbscent}
                            disabled={selectedUser.isAbscent || currentHrs < 9}
                            onClick={() => {
                              handleShow(selectedUser);
                            }}
                          />

                          <div className="knobs" />
                          <div className="layer" />
                        </div>
                      </div>

                      <div
                        style={{
                          width: "13%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div id="eyeicon">
                          <CertificatModal selectedUser={selectedUser} />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "13%",
                        }}
                      >
                        {" "}
                        <div id="dollaricon">
                          <Avance_Approuvement selectedUser={selectedUser} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <div
          className="div2ligne"
          style={{
            width: "98%",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            margin: "auto",
            marginTop: "20px",
            color: "#FFF7D6",
            gap: "1%",
          }}
        >
          <Card
            style={{
              width: "100%",
              backgroundColor: "rgba(0, 126, 127, 0.75)",
              borderRadius: "10px",
              height: "500px",

              marginBottom: "10px",
              overflow: "auto",
            }}
            className="personal-list"
          >
            <Card.Body>
              <Card.Title
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#FFF7D6",
                  fontSize: "30px",
                  fontWeight: "700",
                }}
              >
                Liste du personnel
              </Card.Title>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {users.map((selectedUser) => (
                  <div
                    key={selectedUser._id}
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      gap: "2%",
                      border: "1px solid #FFF7D6",
                      borderRadius: "8px",
                      width: "95%",
                    }}
                    className="divMta3userlist"
                  >
                    <div
                      style={{
                        marginBottom: "10px",
                        padding: "5px",
                        width: "31%",
                      }}
                      className="userspersonel"
                    >
                      <p
                        style={{
                          margin: 0,
                          fontWeight: "bold",
                          fontSize: "20px",
                          color: "#FFF7D6",
                        }}
                      >
                        {selectedUser.Name}
                      </p>
                      <p1
                        style={{
                          margin: 0,
                          color: "#FFF7D6",
                          fontWeight: "500",
                        }}
                      >
                        {selectedUser.Role === "user"
                          ? "Simple Employer"
                          : selectedUser.Role}
                      </p1>
                    </div>
                    <div
                      style={{
                        marginBottom: "10px",
                        padding: "5px",
                        width: "31%",
                      }}
                      className="soldeconge"
                    >
                      <p
                        style={{
                          margin: 0,
                          fontWeight: "bold",
                          fontSize: "20px",
                          color: "#FFF7D6",
                        }}
                      >
                        Solde de congé
                      </p>
                      <p
                        style={{
                          margin: 0,
                          color: "#FFF7D6",
                          fontWeight: "500",
                          fontSize: "20px",
                        }}
                      >
                        {selectedUser.DaysOffPerMounth}
                      </p>
                    </div>

                    <div
                      style={{
                        width: "31%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        gap: "1.5%",
                      }}
                      className="logos"
                    >
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div
                          className=" toggle-button-cover"
                          style={{ marginTop: "3%", width: "13%" }}
                        >
                          <div id="button-3" className=" button r">
                            <input
                              className="checkbox"
                              type="checkbox"
                              defaultChecked={selectedUser.isAbscent}
                              disabled={
                                selectedUser.isAbscent || currentHrs < 9
                              }
                              onClick={() => {
                                handleShow(selectedUser);
                              }}
                            />
                            <div className="knobs" />
                            <div className="layer" />
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          width: "13%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <CertificatModal selectedUser={selectedUser} />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "13%",
                        }}
                      >
                        <Avance_Approuvement selectedUser={selectedUser} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      )}

      {/* ABSCENCE GETSTION MODAL */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}
        >
          <Modal.Title>Abscence</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}>
          <Form>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setJustification(e.target.value)}
              value={Justification}
            >
              <option>L'absence est elle justifier?</option>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </Form.Select>
            {Justification === "non" && (
              <Form.Select
                style={{ marginTop: "10px" }}
                aria-label="Default select example"
                onChange={(e) => setDeduire(e.target.value)}
                value={Deduire}
              >
                <option>Deduire??</option>
                <option value="salaire">Du Salaire</option>
                <option value="congé">Du Solde de congé</option>
              </Form.Select>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}>
          <Button variant="primary" onClick={handleIsAbscent}>
            Mark as Absent
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Dashboard;
