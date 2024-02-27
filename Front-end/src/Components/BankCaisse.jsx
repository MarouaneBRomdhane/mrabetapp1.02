import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { CardText } from "react-bootstrap";
import { getBank_Caisses } from "../Redux/Actions/Bank_Caisses_Action";
import BankCaisseModal from "./BankCaisseModal";
import { getCurrent } from "../Redux/Actions/Users_Action";

function BankCaisse() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBank_Caisses(), getCurrent());
  }, [dispatch]);

  const Caisses = useSelector((state) => state.BankCaisses.BankCaisses);
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
              <CardText
                style={{
                  color: "#FFF7D6",
                  fontSize: "25px",
                  marginLeft: "10px",
                }}
              >
                {caisse.Montant}
              </CardText>
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
              <CardText
                style={{
                  color: "#FFF7D6",
                  fontSize: "25px",
                  marginLeft: "10px",
                }}
              >
                {caisse.Motif}
              </CardText>
            </div>
            {user.Role === "Patron" || user.Role === "fianance" ? (
              <BankCaisseModal caisse={caisse} />
            ) : null}
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default BankCaisse;
