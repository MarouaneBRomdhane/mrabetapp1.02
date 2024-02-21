import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/Actions/Achat_Action";
import EconomaProduct from "./EconomaProduct";
import { Card } from "react-bootstrap";

const Plateformes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.Products.products);
  console.log(products);

  const TotalCuisineProducts = products.reduce(
    (acc, e) =>
      acc +
      e.Product.filter(
        (product) =>
          product.Affectation === "Cuisine" || product.Affectation === "Commune"
      ).reduce(
        (acc, product) =>
          acc +
          (product.Affectation === "Cuisine"
            ? product.Price
            : product.UnitPrice * product.Cuisine),
        0
      ),
    0
  );

  const TotalPizzeriaProducts = products.reduce(
    (acc, e) =>
      acc +
      e.Product.filter(
        (product) =>
          product.Affectation === "Pizzeria" ||
          product.Affectation === "Commune"
      ).reduce(
        (acc, product) =>
          acc +
          (product.Affectation === "Pizzeria"
            ? product.Price
            : product.UnitPrice * product.Pizzeria),
        0
      ),
    0
  );

  const TotalPâtisserieProducts = products.reduce(
    (acc, e) =>
      acc +
      e.Product.filter(
        (product) =>
          product.Affectation === "Pâtisserie" ||
          product.Affectation === "Commune"
      ).reduce(
        (acc, product) =>
          acc +
          (product.Affectation === "Pâtisserie"
            ? product.Price
            : product.UnitPrice * product.Pâtisserie),
        0
      ),
    0
  );

  const TotalBarProducts = products.reduce(
    (acc, e) =>
      acc +
      e.Product.filter(
        (product) =>
          product.Affectation === "Bar" || product.Affectation === "Commune"
      ).reduce(
        (acc, product) =>
          acc +
          (product.Affectation === "Bar"
            ? product.Price
            : product.UnitPrice * product.Bar),
        0
      ),
    0
  );
  return (
    <>
      {/* Card mta3 totale des Achat Cuisine */}
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
              fontSize: "35px",
              fontWeight: "700",
            }}
          >
            Cuisine
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
            {TotalCuisineProducts.toFixed(3)}
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Card mta3 totale des Achat Pizzeria */}
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
              fontSize: "35px",
              fontWeight: "700",
            }}
          >
            Pizzeria
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
            {TotalPizzeriaProducts.toFixed(3)}
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Card mta3 totale des Achat Pâtisserie */}
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
              fontSize: "35px",
              fontWeight: "700",
            }}
          >
            Pâtisserie
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
            {TotalPâtisserieProducts.toFixed(3)}
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Card mta3 totale des Achat BAR */}
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
              fontSize: "35px",
              fontWeight: "700",
            }}
          >
            Bar
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
            {TotalBarProducts.toFixed(3)}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Plateformes;
