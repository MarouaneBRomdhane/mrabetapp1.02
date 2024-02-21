import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { CardText, Row } from "react-bootstrap";
import ModalEvent from "./ModalEvent";
import { getCaissesEvent } from "../Redux/Actions/CaisseEvent_Actions";
import { getCurrent } from "../Redux/Actions/Users_Action";

function CaisseEvent(caisse) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCaissesEvent(), getCurrent());
  }, [dispatch]);

  const Caisses = useSelector((state) => state.caissesEvent.caisses);
  const user = useSelector((state) => state.users.user);

  return (
    <>
      {Caisses.map((caisse) => (
        <Card
          key={caisse._id}
          style={{
            width: "45%",
            marginTop: "30px",
            backgroundColor: "rgba(0, 126, 127, 0.75)",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
          className="Card"
        >
          <Card.Body>
            <Card.Title
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#FFF7D6",
                fontSize: "40px",
                fontWeight: "700",
              }}
            >
              {caisse.Title}
            </Card.Title>
            {/*  div mta3 Ligne Recette */}
            <div style={{ display: "flex" }}>
              <Card.Text
                style={{
                  color: "#FFF7D6",
                  fontSize: "25px",
                  fontWeight: "bold",
                  width: "100px",
                }}
              >
                Recette:
              </Card.Text>
              {caisse.Recette && caisse.Recette.length > 0 && (
                <CardText
                  style={{
                    color: "#FFF7D6",
                    fontSize: "25px",
                    marginLeft: "10px",
                  }}
                >
                  {caisse.Recette[0].montant}
                </CardText>
              )}
            </div>
            {/* RECETTE trander ki luser iselecti fel modal Espece comme type donc el valeur twali >0 */}
            {caisse.Liquide.montantLiquide > 0 && (
              <div style={{ display: "flex" }}>
                <Card.Text
                  style={{
                    color: "#FFF7D6",
                    fontSize: "25px",
                    fontWeight: "bold",
                    width: "100px",
                  }}
                >
                  Espece:
                </Card.Text>
                <Card.Text
                  style={{
                    color: "#FFF7D6",
                    fontSize: "25px",
                    marginLeft: "10px",
                  }}
                >
                  {caisse.Liquide.montantLiquide}
                </Card.Text>
              </div>
            )}
            {/* Cheque ACCORDION irander ki luser iselecti fel modal CHEQUE comme type donc el [].length twali >0 */}
            {caisse.Cheques.length > 0 && (
              <div>
                {/* accordion for CHEQUE statemens */}
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Cheque stamtements</Accordion.Header>
                    <Accordion.Body>
                      <div style={{ height: "100px", overflow: "auto" }}>
                        {caisse.Cheques.map((cheque) => (
                          <div
                            key={cheque._id}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginBottom: "10px",
                              borderBottom: "1px solid rgba(0, 126, 127, 0.75)",
                              paddingBottom: "5px",
                            }}
                          >
                            <div
                              style={{
                                marginRight: "5px",
                                marginTop: "-5px",
                                fontWeight: "bold",
                                fontSize: "17px",
                                width: "80px",
                              }}
                            >
                              Montant:
                            </div>
                            <div
                              style={{
                                marginTop: "-5px",
                                fontSize: "17px",
                                fontWeight: "500",
                                width: "120px",
                              }}
                            >
                              {cheque.MontantDeCheque}
                            </div>
                            <div
                              style={{
                                marginTop: "-5px",
                                marginRight: "5px",
                                fontSize: "17px",
                                fontWeight: "bold",
                              }}
                            >
                              N°:
                            </div>
                            <div
                              style={{
                                marginTop: "-5px",
                                marginRight: "5px",
                                fontSize: "17px",
                                fontWeight: "500",
                              }}
                            >
                              {cheque.NumeroDeCheque}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            )}
            {/* TPE ACCORDION irander ki luser iselecti fel modal CHEQUE comme type donc el [].length twali >0 */}
            {caisse.TPEs.length > 0 && (
              <div>
                {/* accordion for TPE statemens */}
                <Accordion style={{ marginTop: "5px" }}>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>TPE stamtements</Accordion.Header>
                    <Accordion.Body>
                      <div style={{ height: "100px", overflow: "auto" }}>
                        {caisse.TPEs.map((tpe) => (
                          <div
                            key={tpe._id}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginBottom: "10px",
                              borderBottom: "1px solid rgba(0, 126, 127, 0.75)",
                              paddingBottom: "5px",
                            }}
                          >
                            <div
                              style={{
                                marginRight: "5px",
                                marginTop: "-5px",
                                fontWeight: "bold",
                                fontSize: "17px",
                                width: "80px",
                              }}
                            >
                              Montant:
                            </div>
                            <div
                              style={{
                                marginTop: "-5px",
                                fontSize: "17px",
                                fontWeight: "500",
                                width: "120px",
                              }}
                            >
                              {tpe.MontantDeTransaction}{" "}
                              {/* Corrected variable name */}
                            </div>
                            <div
                              style={{
                                marginTop: "-5px",
                                marginRight: "5px",
                                fontSize: "17px",
                                fontWeight: "bold",
                              }}
                            >
                              N°:
                            </div>
                            <div
                              style={{
                                marginTop: "-5px",
                                marginRight: "5px",
                                fontSize: "17px",
                                fontWeight: "500",
                              }}
                            >
                              {tpe.NumeroDeTransaction}{" "}
                              {/* Corrected variable name */}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            )}
            {user.Role === "Patron" || user.Role === "finance" ? (
              <ModalEvent caisse={caisse} />
            ) : null}
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default CaisseEvent;
