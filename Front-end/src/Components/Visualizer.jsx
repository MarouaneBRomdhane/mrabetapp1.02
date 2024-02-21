import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useSelector, useDispatch } from "react-redux";
import { getCaisses1 } from "../Redux/Actions/Caisse1_Action";
import { getCaissesEvent } from "../Redux/Actions/CaisseEvent_Actions";
import { getBank_Caisses } from "../Redux/Actions/Bank_Caisses_Action";
import { getLiquide } from "../Redux/Actions/Liquide_action";

function Visualizer() {
  const dispatch = useDispatch();
  const caisses1 = useSelector((state) => state.caisses1.caisses);
  const caissesEvent = useSelector((state) => state.caissesEvent.caisses);
  const bankCaisses = useSelector((state) => state.BankCaisses.BankCaisses);
  const [totalSumFromEconoma, setTotalSumFromEconoma] = useState(0);
  const [LiquideDisponibleEnCaisse, setLiquideDisponibleEnCaisse] = useState(0);
  const [TotalRecette, setTotalRecette] = useState(0);
  const [TotalCheques, setTotalCheques] = useState(0);
  const [totalTPETransaction, setTotalTPETransaction] = useState(0);

  useEffect(() => {
    dispatch(getCaisses1());
    dispatch(getCaissesEvent());
    dispatch(getBank_Caisses());
    dispatch(getLiquide());
  }, [dispatch]);

  const Liquide = useSelector((state) => state.Liquide.liquide);

  useEffect(() => {
    // Ensure default values are set to 0 if the data is not available
    let TotalEspece = caisses1.reduce((sum, caisse) => {
      if (caisse.Liquide && caisse.Liquide.montantLiquide !== undefined) {
        return sum + caisse.Liquide.montantLiquide;
      } else {
        return sum;
      }
    }, 0);

    caissesEvent.forEach((caisse) => {
      if (caisse.Liquide && caisse.Liquide.montantLiquide !== undefined) {
        TotalEspece += caisse.Liquide.montantLiquide;
      }
    });

    bankCaisses.forEach((caisse) => {
      if (caisse.Montant !== undefined) {
        TotalEspece += caisse.Montant;
      }
    });

    // Ensure totalSum is a number and not NaN
    let totalSumNumeric = parseFloat(totalSumFromEconoma) || 0;

    // Ensure LiquideDisponibleEnCaisse is not NaN and handle division by zero
    setLiquideDisponibleEnCaisse(
      !isNaN(totalSumNumeric) && !isNaN(TotalEspece)
        ? Math.max(0, TotalEspece - totalSumNumeric)
        : 0
    );

    // Calculate Total des recette de caisse
    let newTotalRecette = caisses1.reduce((sum, caisse) => {
      if (caisse.Recette.length > 0) {
        const recetteSum = caisse.Recette.reduce(
          (acc, recette) => acc + recette.montant,
          0
        );
        return sum + recetteSum;
      } else {
        return sum;
      }
    }, 0);

    caissesEvent.forEach((caisse) => {
      if (caisse.Recette.length > 0) {
        newTotalRecette += caisse.Recette.reduce(
          (acc, recette) => acc + recette.montant,
          0
        );
      }
    });

    setTotalRecette(newTotalRecette);

    // Calculate Total des Cheques
    let newTotalCheques = caisses1.reduce((sum, caisse) => {
      if (caisse.Cheques.length > 0) {
        const chequeSum = caisse.Cheques.reduce(
          (acc, cheque) => acc + cheque.MontantDeCheque,
          0
        );
        return sum + chequeSum;
      } else {
        return sum;
      }
    }, 0);

    caissesEvent.forEach((caisse) => {
      if (caisse.Cheques.length > 0) {
        newTotalCheques += caisse.Cheques.reduce(
          (acc, cheque) => acc + cheque.MontantDeCheque,
          0
        );
      }
    });

    setTotalCheques(newTotalCheques);

    // Calculate Total des transaction TPE
    let newTotalTPETransaction = caisses1.reduce((sum, caisse) => {
      if (caisse.TPEs.length > 0) {
        const tpeSum = caisse.TPEs.reduce(
          (acc, tpe) => acc + tpe.MontantDeTransaction,
          0
        );
        return sum + tpeSum;
      } else {
        return sum;
      }
    }, 0);

    caissesEvent.forEach((caisse) => {
      if (caisse.TPEs.length > 0) {
        newTotalTPETransaction += caisse.TPEs.reduce(
          (acc, tpe) => acc + tpe.MontantDeTransaction,
          0
        );
      }
    });

    setTotalTPETransaction(newTotalTPETransaction);
  }, [totalSumFromEconoma, caisses1, caissesEvent, bankCaisses]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "2%",
        flexWrap: "wrap",
        marginBottom: "30px",
        marginTop: "-80px",
        width: "100%",
      }}
    >
      {/* Card mta3 totale des recette */}
      <Card
        style={{
          width: "22%",
          backgroundColor: "rgba(0, 126, 127, 0.75)",
          borderRadius: "10px",
          height: "150px",
          marginTop: "10px",
          marginBottom: "20px",
        }}
        className="Card"
      >
        <Card.Body>
          <Card.Title
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "30px",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Total des recettes
          </Card.Title>
          <Card.Text
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            {" "}
            <h1 id="totalRecetteValue">{TotalRecette}</h1>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Card mta3 total des liquide en caisse */}
      <Card
        style={{
          width: "22%",
          marginTop: "10px",
          backgroundColor: "rgba(0, 126, 127, 0.75)",
          borderRadius: "10px",
          height: "150px",
          marginBottom: "20px",
        }}
        className="Card"
      >
        <Card.Body>
          <Card.Title
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "30px",
              fontWeight: "700",
            }}
          >
            Liquide disponible
          </Card.Title>
          <Card.Text
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            {" "}
            <h1 id="liquideDisponibleValue">{Liquide[0]?.LiquideDisponible}</h1>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Card mta3 total des Cheques */}
      <Card
        style={{
          width: "22%",
          marginTop: "10px",
          backgroundColor: "rgba(0, 126, 127, 0.75)",
          borderRadius: "10px",
          height: "150px",
          marginBottom: "20px",
        }}
        className="Card"
      >
        <Card.Body>
          <Card.Title
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "30px",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Total des Cheques
          </Card.Title>
          <Card.Text
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            {" "}
            <h1 id="totalChequesValue">{TotalCheques}</h1>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Card mta3 total des transaction tpe */}
      <Card
        style={{
          width: "22%",
          marginTop: "10px",
          backgroundColor: "rgba(0, 126, 127, 0.75)",
          borderRadius: "10px",
          height: "150px",
          marginBottom: "20px",
        }}
        className="Card"
      >
        <Card.Body>
          <Card.Title
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "30px",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Total des transaction TPE
          </Card.Title>
          <Card.Text
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            {" "}
            <h1 id="totalTPETransactionValue">{totalTPETransaction}</h1>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Visualizer;
