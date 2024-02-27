import React from "react";

function EconomaProduct({ product }) {
  console.log(product);
  return (
    <>
      {product.Product.map((product) => (
        <div
          className="divMta3lesProduit"
          key={product._id}
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "10px",
            paddingBottom: "auto",
            border: "1px solid #FFF7D6",
            gap: "5px",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              marginTop: "auto",
              fontSize: "30px",
              fontWeight: "500",
              width: "32%",
              color: "#FFF7D6",
              marginLeft: "10px",
            }}
            className="divtextmta3lesproduit"
          >
            <h1>{product.Name}</h1>
          </div>
          <div
            className="textmt3lesproduit"
            style={{ width: "30%", display: "flex" }}
          >
            <div
              style={{
                marginTop: "auto",
                fontSize: "30px",
                fontWeight: "600",
                color: "#FFF7D6",
              }}
              className="divtextmta3lesproduit"
            >
              <h1> Qte:</h1>
            </div>

            <div
              style={{
                marginTop: "auto",
                fontSize: "45px",
                fontWeight: "400",
                color: "#FFF7D6",
              }}
              className="divtextmta3lesproduit2"
            >
              <h1>
                {product.Quantity}
                {product.Unity}
              </h1>
            </div>
          </div>
          <div
            className="textmt3lesproduit"
            style={{ width: "30%", display: "flex" }}
          >
            <div
              style={{
                marginTop: "auto",
                fontSize: "30px",
                fontWeight: "500",
                color: "#FFF7D6",
                marginRight: "10px",
              }}
              className="divtextmta3lesproduit"
            >
              <h1>Prix:</h1>
            </div>
            <div
              style={{
                marginTop: "auto",
                fontSize: "30px",
                fontWeight: "400",
                color: "#FFF7D6",
                marginLeft: "-6px",
                marginRight: "5px",
              }}
              className="divtextmta3lesproduit"
            >
              <h1>{product.Price}Dt</h1>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default EconomaProduct;
