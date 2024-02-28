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
  const [Avance, setAvance] = useState("");
  const [Certificat, setCertificat] = useState("");

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

  const handleAvance = () => {
    const avanceObject = { Montant: Avance, date: FullDate, etat: "attente" };

    const updatedUserAvance = {
      ...user,
      AvanceSurSalaire: [...user.AvanceSurSalaire, avanceObject],
    };

    dispatch(updateUser(user._id, updatedUserAvance));

    setAvance("");
  };

  const handleCertificat = () => {
    const absenceObject = {
      date: FullDate,
      justification: Certificat,
      etat: "attente",
    };
    const updatedUserAbsence = {
      ...user,
      Absence: [...user.Absence, absenceObject],
    };
    dispatch(updateUser(user._id, updatedUserAbsence));
    setCertificat("");
    alert("Certificat médical déposé avec succès.!!");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataUri = e.target.result;
        setCertificat(dataUri);
        console.log(dataUri);
      };

      reader.readAsDataURL(file);
    }
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
            : `Bonsoir ${user.Name}`}
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
      >
        {/* NOMBRE DE JOURS DE TRAVAILLE PAR MOIS */}
        <Card
          style={{
            width: "25%",
            backgroundColor: "rgba(0, 126, 127, 0.75)",
            borderRadius: "10px",
            height: "120px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
          className="Card-dashboard"
        >
          <Card.Body>
            <Card.Title
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#FFF7D6",
                fontSize: "23px",
                fontWeight: "700",
              }}
              className="card-title"
            >
              Jours de travaille /mois
            </Card.Title>
            <Card.Text
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#FFF7D6",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              {user.DaysOfWorkPerMounth} jours
            </Card.Text>
          </Card.Body>
        </Card>

        {/* NOMBRE DE JOURS DE TRAVAILLE RESTANT PAR MOIS */}
        <Card
          style={{
            width: "25%",
            backgroundColor: "rgba(0, 126, 127, 0.75)",
            borderRadius: "10px",
            height: "120px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
          className="Card-dashboard"
        >
          <Card.Body>
            <Card.Title
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#FFF7D6",
                fontSize: "23px",
                fontWeight: "700",
                textAlign: "center",
              }}
              className="card-title"
            >
              Jours de travaille restant
            </Card.Title>
            <Card.Text
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#FFF7D6",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              {user.DaysOfWorkPerMounth} jours
            </Card.Text>
          </Card.Body>
        </Card>

        {/* SOLDE JOURS DE REPOS */}
        <Card
          style={{
            width: "25%",
            backgroundColor: "rgba(0, 126, 127, 0.75)",
            borderRadius: "10px",
            height: "120px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
          className="Card-dashboard"
        >
          <Card.Body>
            <Card.Title
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#FFF7D6",
                fontSize: "23px",
                fontWeight: "700",
              }}
              className="card-title"
            >
              Solde jour de repos
            </Card.Title>
            <Card.Text
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#FFF7D6",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              {user.DaysOffPerMounth} jour(s)
            </Card.Text>
          </Card.Body>
        </Card>

        {/* SALAIRE RESTANT POUR LE CURENT MONTH */}
        <Card
          style={{
            width: "25%",
            backgroundColor: "rgba(0, 126, 127, 0.75)",
            borderRadius: "10px",
            height: "120px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
          className="Card-dashboard"
        >
          <Card.Body>
            <Card.Title
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#FFF7D6",
                fontSize: "23px",
                fontWeight: "700",
              }}
              className="card-title"
            >
              Salaire restant pour ce mois
            </Card.Title>
            <Card.Text
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#FFF7D6",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              {user.SalaireForCurrentMonth.toFixed(3)} dt
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

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
              width: "50%",
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
              <div>
                {users.map((selectedUser) => (
                  <div
                    key={selectedUser._id}
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      gap: "2%",
                      border: "1px solid #FFF7D6",
                      borderRadius: "8px",
                    }}
                    className="divMta3userlist"
                  >
                    <div
                      style={{
                        marginBottom: "10px",
                        padding: "5px",
                        width: "25%",
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
                    {user.Role === "Patron" ||
                    user.Role === "gerant" ||
                    user.Role === "finance" ? (
                      <div
                        style={{
                          marginBottom: "10px",
                          padding: "5px",
                          width: "21%",
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
                          Salaire de ce mois
                        </p>
                        <p
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
                    ) : null}

                    <div
                      style={{
                        width: "20%",
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "3%",
                        gap: "6%",
                      }}
                      className="logos"
                    >
                      <div
                        className=" toggle-button-cover"
                        style={{ marginTop: "8%" }}
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

                      <div style={{ marginLeft: "2%" }}>
                        <CertificatModal selectedUser={selectedUser} />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
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

          <div style={{ width: "25%" }} className="secondligne">
            {/* DEMANDE D'AVANCE SUR SALAIRE */}
            <Card
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 126, 127, 0.75)",
                borderRadius: "10px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              className="dashboard-Card"
            >
              <Card.Body
                className="dashboard-Card"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Card.Title
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#FFF7D6",
                    fontSize: "30px",
                    fontWeight: "700",
                  }}
                  className="dashcardtitle"
                >
                  Demande avance sur salaire
                </Card.Title>
                <Form>
                  <Form.Group
                    className=" mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
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
                <Button
                  style={{ alignSelf: "center" }}
                  className=" dashbtn BTN"
                  onClick={handleAvance}
                >
                  {" "}
                  Soumettre
                </Button>
              </Card.Body>
            </Card>

            {/* DEPOSER UN JUSTIFICATIF D'ABSCENCE */}
            <Card
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 126, 127, 0.75)",
                borderRadius: "10px",
                marginBottom: "10px",
                height: "46%",
              }}
              className="dashboard-Card"
            >
              <Card.Body
                className="dashboard-Card"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Card.Title
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#FFF7D6",
                    fontSize: "28px",
                    fontWeight: "700",
                    textAlign: "center",
                    marginBottom: "16%",
                  }}
                  className="dashcardtitle"
                >
                  Certificat Medical
                </Card.Title>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="file"
                      autoFocus
                      onChange={(e) => handleImageChange(e)}
                      accept="image/*"
                    />
                  </Form.Group>
                </Form>
                <Button
                  style={{ alignSelf: "center" }}
                  className=" dashbtn BTN"
                  onClick={handleCertificat}
                >
                  {" "}
                  Soumettre
                </Button>
              </Card.Body>
            </Card>
          </div>
          <div style={{ width: "25%" }} className="secondligne">
            {/* LISTE DES AVANCE POUR MOIS COURANT */}
            <Card
              style={{
                width: "100%",
                height: "46%",
                backgroundColor: "rgba(0, 126, 127, 0.75)",
                borderRadius: "10px",
                marginTop: "10px",
                marginBottom: "10px",
                overflow: "auto",
              }}
              className="dashboard-Card"
            >
              <Card.Body style={{ display: "flex", flexDirection: "column" }}>
                <Card.Title
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#FFF7D6",
                    fontSize: "30px",
                    fontWeight: "700",
                  }}
                  className="dashcardtitle"
                >
                  Mes avance pour ce mois
                </Card.Title>
                <div>
                  {user.AvanceSurSalaire.map((avance) => (
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
              </Card.Body>
            </Card>

            {/* LISTE DES ABSCENCE POUR MOIS COURANT */}
            <Card
              style={{
                width: "100%",
                height: "46%",
                backgroundColor: "rgba(0, 126, 127, 0.75)",
                borderRadius: "10px",
                marginBottom: "10px",
                overflow: "auto",
              }}
              className="dashboard-Card"
            >
              <Card.Body>
                <Card.Title
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#FFF7D6",
                    fontSize: "28px",
                    fontWeight: "700",
                    textAlign: "center",
                    marginBottom: "16%",
                  }}
                >
                  Mes abscence pour ce mois
                </Card.Title>
                <div style={{ marginTop: "-15%" }}>
                  {user.Absence.map((abscence) => (
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
                      className="dashcardtitle divMta3userlist "
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
              </Card.Body>
            </Card>
          </div>
        </div>
      ) : (
        <div
          className="div2ligne"
          style={{ display: "flex", justifyContent: "center", gap: "1%" }}
        >
          <div style={{ width: "47%" }} className="secondligne">
            {/* DEMANDE D'AVANCE SUR SALAIRE */}
            <Card
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 126, 127, 0.75)",
                borderRadius: "10px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              className="dashboard-Card"
            >
              <Card.Body
                className="dashboard-Card"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Card.Title
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#FFF7D6",
                    fontSize: "30px",
                    fontWeight: "700",
                  }}
                  className="dashcardtitle"
                >
                  Demande avance sur salaire
                </Card.Title>
                <Form>
                  <Form.Group
                    className=" mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
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
                <Button
                  style={{ alignSelf: "center" }}
                  className=" dashbtn BTN"
                  onClick={handleAvance}
                >
                  {" "}
                  Soumettre
                </Button>
              </Card.Body>
            </Card>

            {/* DEPOSER UN JUSTIFICATIF D'ABSCENCE */}
            <Card
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 126, 127, 0.75)",
                borderRadius: "10px",
                marginBottom: "10px",
                height: "46%",
              }}
              className="dashboard-Card"
            >
              <Card.Body
                className="dashboard-Card"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Card.Title
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#FFF7D6",
                    fontSize: "28px",
                    fontWeight: "700",
                    textAlign: "center",
                    marginBottom: "16%",
                  }}
                  className="dashcardtitle"
                >
                  Certificat Medical
                </Card.Title>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="file"
                      autoFocus
                      onChange={(e) => handleImageChange(e)}
                      accept="image/*"
                      style={{ marginTop: "-12.5%" }}
                    />
                  </Form.Group>
                </Form>
                <Button
                  style={{ alignSelf: "center", marginTop: "-5%" }}
                  className=" dashbtn BTN"
                  onClick={handleCertificat}
                >
                  {" "}
                  Soumettre
                </Button>
              </Card.Body>
            </Card>
          </div>
          <div style={{ width: "47%" }} className="secondligne">
            {/* LISTE DES AVANCE POUR MOIS COURANT */}
            <Card
              style={{
                width: "100%",
                height: "46%",
                backgroundColor: "rgba(0, 126, 127, 0.75)",
                borderRadius: "10px",
                marginTop: "10px",
                marginBottom: "10px",
                overflow: "auto",
              }}
              className="dashboard-Card"
            >
              <Card.Body style={{ display: "flex", flexDirection: "column" }}>
                <Card.Title
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#FFF7D6",
                    fontSize: "30px",
                    fontWeight: "700",
                  }}
                  className="dashcardtitle"
                >
                  Mes avance pour ce mois
                </Card.Title>
                <div>
                  {user.AvanceSurSalaire.map((avance) => (
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
              </Card.Body>
            </Card>

            {/* LISTE DES ABSCENCE POUR MOIS COURANT */}
            <Card
              style={{
                width: "100%",
                height: "46%",
                backgroundColor: "rgba(0, 126, 127, 0.75)",
                borderRadius: "10px",
                marginBottom: "10px",
                overflow: "auto",
              }}
              className="dashboard-Card"
            >
              <Card.Body>
                <Card.Title
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#FFF7D6",
                    fontSize: "28px",
                    fontWeight: "700",
                    textAlign: "center",
                    marginBottom: "16%",
                  }}
                >
                  Certificat Medical
                </Card.Title>
                <div style={{ marginTop: "-15%" }}>
                  {user.Absence.map((abscence) => (
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
              </Card.Body>
            </Card>
          </div>
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
