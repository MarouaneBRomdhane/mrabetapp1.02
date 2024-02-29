import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Modal1 from "./Modal1";
import { useDispatch, useSelector } from "react-redux";
import { getCaisses1 } from "../Redux/Actions/Caisse1_Action";
import { Row } from "react-bootstrap";

import Visualizer from "./Visualizer";
import CaisseEvent from "./CaisseEvent";
import BankCaisse from "./BankCaisse";
import Navbar from "./Navbar";
import { getCurrent } from "../Redux/Actions/Users_Action";

function Caisse1(caisse) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCaisses1(), getCurrent());
  }, [dispatch]);

  const Caisses = useSelector((state) => state.caisses1.caisses);
  const user = useSelector((state) => state.users.user);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
          marginBottom: "-50px",
          width: "100%",
        }}
      >
        <Visualizer />
      </div>

      <Row className="mx-auto items-center mt-4 h-96 flex justify-center gap-x-9">
        <div
          className="historycards"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2%",
          }}
        >
          {Caisses.map((caisse) => (
            <Card
              style={{
                backgroundColor: "rgba(0, 126, 127, 0.75)",
                width: "22%",
              }}
              key={caisse._id}
              className="Card rounded-lg shadow-md "
            >
              <Card.Body>
                <Card.Title
                  style={{
                    color: "#FFF7D6",
                    textAlign: "center",
                    fontSize: "40px",
                    fontWeight: "700",
                  }}
                >
                  {caisse.Title}
                </Card.Title>
                <div className="flex">
                  <Card.Text className="text-white text-2xl font-bold w-100">
                    Recette:
                  </Card.Text>
                  {caisse.Recette && caisse.Recette.length > 0 && (
                    <Card.Text className="text-white text-2xl ml-2">
                      {caisse.Recette[0].montant}
                    </Card.Text>
                  )}
                </div>
                <div className="flex">
                  <Card.Text className="text-white text-2xl font-bold w-100">
                    Espece:
                  </Card.Text>
                  <Card.Text className="text-white text-2xl ml-2">
                    {caisse.Liquide.montantLiquide}
                  </Card.Text>
                </div>

                {/* accordion for CHEQUE statemens */}
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Cheque stamtements</Accordion.Header>
                    <Accordion.Body>
                      <div className="h-40 overflow-auto">
                        {caisse.Cheques.map((cheque) => (
                          <div
                            key={cheque._id}
                            className="flex flex-row mb-4 border-b-2 border-green-700 pb-2"
                          >
                            <div className="mr-2 mt-2 font-bold text-lg w-32">
                              Montant:
                            </div>
                            <div className="text-lg font-medium w-44">
                              {cheque.MontantDeCheque}
                            </div>
                            <div className="mr-2 mt-2 font-bold">N°:</div>
                            <div className="text-lg font-medium">
                              {cheque.NumeroDeCheque}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                {/* accordion for TPE statemens */}
                <Accordion className="mt-2">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>TPE stamtements</Accordion.Header>
                    <Accordion.Body>
                      <div className="h-40 overflow-auto">
                        {caisse.TPEs.map((tpe) => (
                          <div
                            key={tpe._id}
                            className="flex flex-row mb-4 border-b-2 border-green-700 pb-2"
                          >
                            <div className="mr-2 mt-2 font-bold text-lg w-32">
                              Montant:
                            </div>
                            <div className="text-lg font-medium w-44">
                              {tpe.MontantDeTransaction}
                            </div>
                            <div className="mr-2 mt-2 font-bold">N°:</div>
                            <div className="text-lg font-medium">
                              {tpe.NumeroDeTransaction}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                {user.Role === "Patron" || user.Role === "finance" ? (
                  <Modal1 caisse={caisse} />
                ) : null}
              </Card.Body>
            </Card>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2%",
              marginBottom: "20px",
              width: "100%",
            }}
          >
            <CaisseEvent />
            <BankCaisse />
          </div>
        </div>
      </Row>
    </>
  );
}

export default Caisse1;
