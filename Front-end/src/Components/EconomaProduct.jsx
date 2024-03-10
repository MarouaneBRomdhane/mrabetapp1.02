import React from "react";

function EconomaProduct({ product }) {
  return (
    <div style={{ width: "90%" }}>
      {product.Product.map((product) => (
        <div
          className="divMta3lesProduit"
          key={product._id}
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "1%",
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
              fontWeight: "700",
              width: "32%",
              color: "#FFF7D6",
              marginLeft: "10px",
            }}
            className="divtextmta3lesproduit"
          >
            {product.Name}
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
              Qte:
            </div>

            <div
              style={{
                marginTop: "auto",
                fontSize: "30px",
                fontWeight: "400",
                color: "#FFF7D6",
                marginLeft: "5%",
              }}
              className="divtextmta3lesproduit"
            >
              {product.Quantity}
              {product.Unity}
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
                fontWeight: "700",
                color: "#FFF7D6",
                marginRight: "10px",
              }}
              className="divtextmta3lesproduit"
            >
              Prix:
            </div>
            <div
              style={{
                marginTop: "auto",
                fontSize: "30px",
                fontWeight: "400",
                color: "#FFF7D6",
                // marginLeft: "-6px",
                marginRight: "5px",
              }}
              className="divtextmta3lesproduit"
            >
              {product.Price}dt
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EconomaProduct;
