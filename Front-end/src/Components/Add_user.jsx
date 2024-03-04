import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent, getUsers } from "../Redux/Actions/Users_Action";
import { Button, Card, Form } from "react-bootstrap";

const Add_user = () => {
  const [Name, setName] = useState("");
  const [Poste, setPoste] = useState("");
  const [Salaire, setSalaire] = useState("");
  const [WorkDays, setWorkDays] = useState("");
  const [Password, setPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrent());
    dispatch(getUsers());
  }, [dispatch]);

  const user = useSelector((state) => state.users.user);
  const users = useSelector((state) => state.users.users);

  const handleAddUser = {
    // const newUser = {Name:Name, Role:Poste, Salaire:Salaire, DaysOffWorkPerMounth:WorkDays },
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          gap: "2%",
        }}
      >
        <div
          className="div2ligne"
          style={{
            width: "45%",
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
              width: "95%",
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
                        width: "30%",
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
                        width: "30%",
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
                        width: "30%",
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
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
        <div style={{ width: "50%", marginTop: "20px" }}>
          <Card
            style={{
              width: "95%",
              backgroundColor: "rgba(0, 126, 127, 0.75)",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
            className="Card"
          >
            <Card.Body>
              <Card.Title
                className="visualiser-title"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#FFF7D6",
                  fontSize: "30px",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                Ajouter utilisateur
              </Card.Title>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label style={{ color: "#FFF7D6", fontSize: "25px" }}>
                    Nom et Prenom
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserer le montant du ticket de caisse"
                    autoFocus
                    style={{ marginTop: "-10px" }}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label style={{ color: "#FFF7D6", fontSize: "25px" }}>
                    Poste
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserer le montant du liquide disponible en caisse"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label style={{ color: "#FFF7D6", fontSize: "25px" }}>
                    Salaire
                  </Form.Label>
                  <Form.Control
                    type="numbetr"
                    placeholder="Inserer le montant du liquide disponible en caisse"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label style={{ color: "#FFF7D6", fontSize: "25px" }}>
                    Nombre de jour de travaille par mois
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Inserer le montant du liquide disponible en caisse"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label style={{ color: "#FFF7D6", fontSize: "25px" }}>
                    Mot de passe
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Inserer le montant du liquide disponible en caisse"
                    autoFocus
                  />
                </Form.Group>
              </Form>
              <Button className="BTN">Ajouter</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Add_user;
