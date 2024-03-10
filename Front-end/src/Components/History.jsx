import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../Redux/Actions/History_Action";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Accordion, Card, Modal, Row } from "react-bootstrap";
import VisualizerHistory from "./VisualizerHistory";
import EconomaProduct from "./EconomaProduct";
import Navbar from "./Navbar";
import PlateformesHistory from "./PlateformesHistory";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteProduct } from "../Redux/Actions/Achat_Action";
import EditProduct from "./EditProduct";

const History = () => {
  const [date, setDate] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  const histories = useSelector((state) => state.history.histories);

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle image click and show modal
  const handleImageClick = (imageURL) => {
    setSelectedImage(imageURL);
    setShowModal(true);
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="historybackgrond"
          style={{
            marginTop: "50px",
            borderRadius: "10px",
            backgroundColor: "rgba(0, 126, 127, 0.75)",
            height: "70px",
            width: "40%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <InputGroup
            className=" inputgrouphistory mb-3"
            style={{ width: "95%", marginTop: "15px" }}
          >
            <Form.Control
              placeholder="Date de la journée a redecouvrir"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Button id="button-addon2">Button</Button>
          </InputGroup>
        </div>
      </div>

      <div>
        {histories
          .filter((e) => e.createdAt.toString().slice(0, 10) === date)
          .map((e) => (
            <div
              style={{
                marginTop: "40px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  border: "2px",
                }}
              >
                <Row
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "2%",
                  }}
                >
                  <VisualizerHistory
                    caisses1={e.caisses1}
                    caissesEvent={e.caisseEvent}
                    bankCaisses={e.Bankcaisse}
                    LiquideDisponible={e.LiquideDisponible.LiquideDisponible}
                  />
                  <PlateformesHistory products={e.AchatProduct} />
                </Row>
              </div>
              <div
                id="cargap"
                className="mx-0 my-auto mt-4 flex justify-center gap-9"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "2%",
                }}
              >
                {e.caisses1.map((caisse) => (
                  <Card
                    key={caisse._id}
                    style={{
                      backgroundColor: "rgba(0, 126, 127, 0.75)",
                      width: "30%",
                    }}
                    className="Card rounded-lg shadow-md "
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
                          <Card.Text
                            style={{
                              color: "#FFF7D6",
                              fontSize: "25px",
                              marginLeft: "10px",
                            }}
                          >
                            {caisse.Recette[0].montant}
                          </Card.Text>
                        )}
                      </div>
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

                      {/* accordion for CHEQUE statemens */}
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            Cheque stamtements
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ height: "100px", overflow: "auto" }}>
                              {caisse.Cheques.map((cheque) => (
                                <div
                                  key={cheque._id}
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginBottom: "10px",
                                    borderBottom:
                                      "1px solid rgba(0, 126, 127, 0.75)",
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
                                    borderBottom:
                                      "1px solid rgba(0, 126, 127, 0.75)",
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
                    </Card.Body>
                  </Card>
                ))}
              </div>{" "}
              <div
                className="caisseEventHistory"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  gap: "2%",
                  // position: "absolute",
                  // top: "0",
                }}
              >
                {/* CAISSE EVENT HISTORIQUE */}
                <Card
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
                      {e.caisseEvent.Title}
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
                      {e.caisseEvent.Recette &&
                        e.caisseEvent.Recette.length > 0 && (
                          <Card.Text
                            style={{
                              color: "#FFF7D6",
                              fontSize: "25px",
                              marginLeft: "10px",
                            }}
                          >
                            {e.caisseEvent.Recette[0].montant}
                          </Card.Text>
                        )}
                    </div>
                    {/* RECETTE trander ki luser iselecti fel modal Espece comme type donc el valeur twali >0 */}
                    {e.caisseEvent.Liquide.montantLiquide > 0 && (
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
                          {e.caisseEvent.Liquide.montantLiquide}
                        </Card.Text>
                      </div>
                    )}
                    {/* Cheque ACCORDION irander ki luser iselecti fel modal CHEQUE comme type donc el [].length twali >0 */}
                    {e.caisseEvent.Cheques.length > 0 && (
                      <div>
                        {/* accordion for CHEQUE statemens */}
                        <Accordion>
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>
                              Cheque stamtements
                            </Accordion.Header>
                            <Accordion.Body>
                              <div
                                style={{ height: "100px", overflow: "auto" }}
                              >
                                {e.caisseEvent.Cheques.map((cheque) => (
                                  <div
                                    key={cheque._id}
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      marginBottom: "10px",
                                      borderBottom:
                                        "1px solid rgba(0, 126, 127, 0.75)",
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
                    {e.caisseEvent.TPEs.length > 0 && (
                      <div>
                        {/* accordion for TPE statemens */}
                        <Accordion style={{ marginTop: "5px" }}>
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>TPE stamtements</Accordion.Header>
                            <Accordion.Body>
                              <div
                                style={{ height: "100px", overflow: "auto" }}
                              >
                                {e.caisseEvent.TPEs.map((tpe) => (
                                  <div
                                    key={tpe._id}
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      marginBottom: "10px",
                                      borderBottom:
                                        "1px solid rgba(0, 126, 127, 0.75)",
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
                  </Card.Body>
                </Card>

                <Card
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
                      {e.Bankcaisse.Title}
                    </Card.Title>
                    <div style={{ display: "flex" }}>
                      <Card.Text
                        style={{
                          color: "#FFF7D6",
                          fontSize: "25px",
                          fontWeight: "bold",
                          width: "110px",
                        }}
                      >
                        Montant:
                      </Card.Text>
                      <Card.Text
                        style={{
                          color: "#FFF7D6",
                          fontSize: "25px",
                          marginLeft: "10px",
                        }}
                      >
                        {e.Bankcaisse.Montant}
                      </Card.Text>
                    </div>
                    <div style={{ display: "flex" }}>
                      <Card.Text
                        style={{
                          color: "#FFF7D6",
                          fontSize: "25px",
                          fontWeight: "bold",
                          width: "80px",
                        }}
                      >
                        Motif:
                      </Card.Text>
                      <Card.Text
                        style={{
                          color: "#FFF7D6",
                          fontSize: "25px",
                          marginLeft: "10px",
                        }}
                      >
                        {e.Bankcaisse.Motif}
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Card
                  id="historyListAchat"
                  style={{
                    width: "92%",
                    height: "500px",
                    overflow: "auto",
                    marginTop: "30px",
                    backgroundColor: "rgba(0, 126, 127, 0.75)",
                    borderRadius: "10px",
                  }}
                  className="Card"
                >
                  <Card.Body>
                    <Card.Title
                      style={{
                        textAlign: "center",
                        color: "#FFF7D6",
                        fontSize: "3rem",
                        marginBottom: "25px",
                      }}
                    >
                      Liste des achats
                      <br />
                      {e.AchatProduct.reduce(
                        (acc, e) =>
                          acc + e.Product.reduce((acc, e) => acc + e.Price, 0),
                        0
                      )}
                    </Card.Title>

                    <div style={{ marginTop: "25px" }}>
                      {e.AchatProduct.map((product) => (
                        <div
                          style={{
                            border: "4px solid #FFF7D6",
                            borderRadius: "10px",
                            margin: "1%",
                            backgroundColor: "rgba(0, 126, 127, 0.75)",
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                        >
                          <EconomaProduct product={product} key={product._id} />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-around",
                              height: "150px",
                            }}
                          >
                            <FaFileInvoiceDollar
                              color="#FFF7D6"
                              size={35}
                              onClick={() => handleImageClick(product.Facture)}
                              className="editProducticons"
                            />
                            <EditProduct product={product} key={product._id} />
                            <FaRegTrashCan
                              color="#FFF7D6"
                              size={35}
                              onClick={() =>
                                dispatch(deleteProduct(product._id))
                              }
                              className="editProducticons"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          ))}
      </div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="xl"
        dialogClassName="modal-90w"
      >
        <Modal.Body>
          <img
            src={selectedImage}
            alt="Selected "
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default History;
