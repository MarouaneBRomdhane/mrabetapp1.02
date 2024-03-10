import React from "react";
import Card from "react-bootstrap/Card";

function VisualizerHistory({
  caisses1,
  caissesEvent,
  bankCaisses,
  LiquideDisponible,
}) {
  const totalCaisses1 = caisses1.reduce(
    (acc, e) =>
      acc +
      e.Recette?.reduce(
        (acc, e) => acc + (e.montant === null ? 0 : e.montant),
        0
      ),
    0
  );

  const totalCheques =
    caisses1.reduce(
      (acc, e) =>
        acc +
        e.Cheques.reduce(
          (acc, e) =>
            acc + (e.MontantDeCheque === null ? 0 : e.MontantDeCheque),
          0
        ),
      0
    ) +
    caissesEvent.Cheques.reduce(
      (acc, e) => acc + (e.MontantDeCheque === null ? 0 : e.MontantDeCheque),
      0
    );

  const totalTpe =
    caisses1.reduce(
      (acc, e) =>
        acc +
        e.TPEs.reduce(
          (acc, e) =>
            acc +
            (e.MontantDeTransaction === null ? 0 : e.MontantDeTransaction),
          0
        ),
      0
    ) +
    caissesEvent.TPEs.reduce(
      (acc, e) =>
        acc + (e.MontantDeTransaction === null ? 0 : e.MontantDeTransaction),
      0
    );

  return (
    <>
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
            {totalCaisses1 +
              (isNaN(caissesEvent.Recette[0]?.montant)
                ? 0
                : caissesEvent.Recette[0]?.montant
              ).toFixed(3)}
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
            {LiquideDisponible.toFixed(3)}
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
            {totalCheques.toFixed(3)}
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
            {totalTpe.toFixed(3)}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default VisualizerHistory;
