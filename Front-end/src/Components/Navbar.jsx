import React from "react";
import { Menu } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Log_out } from "../Redux/Actions/Users_Action";
import { ImExit, ImPrinter } from "react-icons/im";
import logo from "../Media/logo.png";
export default function Navbar() {
  console.log(window.location.pathname);
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const Caisses = useSelector((state) => state.caisses1.caisses);
  const BankCaisses = useSelector((state) => state.BankCaisses.BankCaisses);
  const EventCaisses = useSelector((state) => state.caissesEvent.caisses);
  const products = useSelector((state) => state.Products.products);
  console.log(products);

  const handlePrint = () => {
    const totalRecetteValue =
      document.getElementById("totalRecetteValue").innerText;
    const liquideDisponibleValue = document.getElementById(
      "liquideDisponibleValue"
    ).innerText;
    const totalChequesValue =
      document.getElementById("totalChequesValue").innerText;
    const totalTPETransactionValue = document.getElementById(
      "totalTPETransactionValue"
    ).innerText;

    const printWindow = window.open("", "_blank");
    const htmlContent = `
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Resumé de la journée</title>
  <style>
    @media print {
      body {
        margin: 0;
        padding: 0;
        background-color: #fff;
        display: flex;
        flex-direction: column; /* Change to column for vertical display */
        align-items: center; /* Center horizontally */
      }

      .content {
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.6;
        margin: 0.2cm 0; /* Adjust top and bottom margin */
        display: flex;
        flex-direction: row; /* Change to row for horizontal display */
        gap: 10px; /* Adjust gap */
        align-items: flex-start;
        justify-content: center; /* Center horizontally */
        width:700px;
      }

      .card {
        width: 160px; /* Adjust card width */
        height: 105px;
        border: solid 1px #00273C;
        border-radius: 10px;
        margin-right: auto; /* Adjust margin between cards */
        padding: 10px;
        color: #00273C;
        font-size: 18px;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        text-align: center;
      }

      .card div:nth-child(2) {
        font-size: 32px;
      }

      /* New styles for BankCaisse Montant */
      .bank-caisse-montant-card {
        width: 350px; 
        
        border : solid 1px #00273C;
        border-radius: 10px;
        padding: 10px;
        margin-right: auto; 
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        text-align: center;
      }

      .bank-caisse-montant {
        font-size: 32px; /* Adjust font size */
        color: #00273C;
        font-weight: bold;
        margin-top: -20px;
        margin-bottom: -10px; 
        text-align: center;
      }

      .bank-caisse-title {
        font-size: 20px; /* Adjust title font size */
        color: #00273C; 
        font-weight: bold;
        text-align: center;
        margin-top: 10px; /* Adjust title margin */
      }

      .product-list-card {
        width: 700px; /* Two card widths + gap */
        border: solid 1px #00273C;
        border-radius: 10px;
        padding: 10px;
        margin-right: auto;
        margin-top: -10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        text-align: center;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(500px, 2fr)); /* Adjust the min and max width */
        gap: 5px; /* Adjust the gap between items */
      }

      .product-list-title {
        font-size: 20px; /* Adjust title font size */
        color: #00273C; 
        font-weight: bold;
        text-align: center;
        margin-top: 10px; /* Adjust title margin */
        width: 700px;
      }

      .product-list-item {
        display: flex;
        font-size: 16px; /* Adjust font size */
        color: ##00273C;
        margin-top: 5px; /* Adjust margin */
        text-align: start;
        border: solid 0.5px  #00273C ;
        border-radius: 5px;
        padding:3px;
        box-sizing: border-box;
       
      }
   
    }
  </style>
</head>

<body>
  <!-- Row for Visualizer -->
  <div class="content">
    <div class="card">
      <div>Total des recettes</div>
      <div id="totalRecetteValue">${totalRecetteValue}</div>
    </div>
    <div class="card">
      <div>Liquide disponible</div>
      <div id="liquideDisponibleValue">${liquideDisponibleValue}</div>
    </div>
    <div class="card">
      <div>Total des Cheques</div>
      <div>${totalChequesValue}</div>
    </div>
    <div class="card">
      <div>Total des TPE</div>
      <div>${totalTPETransactionValue}</div>
    </div>
  </div>

  <!-- Row for Caisse -->
  <div class="content">
    ${Caisses.map(
      (caisse) => `
        <div class="card">
          <div>${caisse.Title}</div>
          <div style="margin-bottom:-20px;">
            ${
              caisse.Recette && caisse.Recette.length > 0
                ? caisse.Recette[0].montant
                : "N/A"
            }
          </div>
        </div>
      `
    ).join("")}
  </div>

  <!-- Row for BankCaisse Montant && Caisse event-->
  <div class="content"> 
    <div class="content bank-caisse-montant-card">
      <div class="bank-caisse-title">Retrait bancaire</div>
      ${BankCaisses.map(
        (caisse) => `
          <div class="bank-caisse-montant">${caisse.Montant}</div>
        `
      ).join("")}
    </div>
    <div class="content bank-caisse-montant-card">
      ${EventCaisses.map(
        (caisse) => `
          <div class="bank-caisse-title">${caisse.Title}</div>
          <div class="bank-caisse-montant"> ${
            caisse.Recette && caisse.Recette.length > 0
              ? caisse.Recette[0].montant
              : "N/A"
          }</div>
        `
      ).join("")}
    </div>
  </div>

  <!-- Row for Product List -->
  <div class="content">
    <div class="content product-list-card">
      <div class="product-list-title">Product List</div>
      ${products
        .map(
          (product) => `
            ${product.Product.map(
              (item) => `
                <div class="product-list-item ">
                  <div style="margin-left:10px;width:30%;">${item.Name}</div>
                  <div style="margin-left:20px;width:30%;"">Qte: ${item.Quantity}${item.Unity}</div>
                  <div style="margin-left:20px;width:30%;">Prix: ${item.Price}Dt</div>
                </div>
              `
            ).join("")}
          `
        )
        .join("")}
    </div>
  </div>
  
  
</body>

</html>

    
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div
      as="nav"
      className="NavBar-BackGround  flex-col md:flex-row items-center "
      id="navbBar"
      style={{
        display: "flex",
        gap: "1%",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        id="nav-components"
        className=" "
        style={{
          display: "flex",
          justifyContent: "space-around",

          width: "32%",
        }}
      >
        {" "}
        <div className=" hover:text-white   py-2   mt-2.5 ">
          {window.location.pathname === "/Caisses1" ? (
            <Link
              to="/Caisses1"
              style={{
                textDecoration: "none",
                transition: "all 500ms",
                color: "hwb(41 21% 27%)",
                fontWeight: "700",
              }}
            >
              {" "}
              <h6>Caisses</h6>
            </Link>
          ) : (
            <Link
              to="/Caisses1"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {" "}
              <h6 id="navbar-text">Caisses</h6>
            </Link>
          )}
        </div>
        <div className=" hover:text-white rounded-md px-3 py-2  mt-2.5 ">
          {window.location.pathname === "/Economa" ? (
            <Link
              to="/Economa"
              style={{
                textDecoration: "none",
                transition: "all 500ms",
                color: "hwb(41 21% 27%)",
                fontSize: "20px",
              }}
            >
              {" "}
              <h6>Dépenses</h6>
            </Link>
          ) : (
            <Link
              to="/Economa"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {" "}
              <h6 id="navbar-text">Dépenses</h6>
            </Link>
          )}
        </div>
        <div className=" hover:text-white rounded-md  py-2 l  mt-2.5 ml-0">
          {window.location.pathname === "/history" ? (
            <Link
              to="/history"
              style={{
                textDecoration: "none",
                transition: "all 500ms",
                color: "hwb(41 21% 27%)",
                fontWeight: "700",
              }}
            >
              {" "}
              <h6>Historique</h6>
            </Link>
          ) : (
            <Link
              to="/history"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {" "}
              <h6 id="navbar-text">Historique</h6>
            </Link>
          )}
        </div>
      </div>
      <div
      className="mrabet-logo"
        style={{
          justifyContent: "center",
          gap: "1%",
          width: "38%",
          paddingLeft: "17%",
        }}
      >
        <Link to="/dashboard">
          <img className="mrabet-logo" src={logo} alt="#" />
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1%",
          width: "30%",
          paddingLeft: "16%",
        }}
      >
        <Menu as="div" className=" logoutImpr relative  mr-0 flex  ">
          <a
            style={{
              textDecoration: "none",
              fontFamily: "Courier New",
              backgroundColor: "none",
            }}
            href="#"
            id="navbar-text"
            className=" block px-4 py-2 text-sm  mt-2.5"
          >
            <h4>
              <ImPrinter onClick={handlePrint} />
            </h4>
          </a>
          <a
            style={{
              textDecoration: "none",
              fontFamily: "Courier New",
            }}
            href="#"
            id="navbar-text"
            className=" block px-4 py-2 text-sm  mt-2.5"
            onClick={() => dispatch(Log_out(Navigate))}
          >
            <h4>
              <ImExit />
            </h4>
          </a>
        </Menu>
      </div>
    </div>
  );
}