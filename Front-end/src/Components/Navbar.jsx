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
  const navigate = useNavigate();

  const Caisses = useSelector((state) => state.caisses1.caisses);
  const BankCaisses = useSelector((state) => state.BankCaisses.BankCaisses);
  const EventCaisses = useSelector((state) => state.caissesEvent.caisses);
  const products = useSelector((state) => state.Products.products);
  console.log(products);

  const handlePrint = () => {
    // Printing logic here
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
        {user.Role === "Patron" ||
        user.Role === "finance" ||
        user.Role === "gerant" ? (
          <div className="hover:text-white   py-2   mt-2.5 ">
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
                <h6>Caisses</h6>
              </Link>
            ) : (
              <Link
                to="/Caisses1"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h6 id="navbar-text">Caisses</h6>
              </Link>
            )}
          </div>
        ) : null}

        {user.Role === "Patron" ||
        user.Role === "finance" ||
        user.Role === "gerant" ||
        user.Role === "achat" ? (
          <div className="hover:text-white rounded-md px-3 py-2  mt-2.5 ">
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
                <h6>Dépenses</h6>
              </Link>
            ) : (
              <Link
                to="/Economa"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h6 id="navbar-text">Dépenses</h6>
              </Link>
            )}
          </div>
        ) : null}
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
          {user.Role === "Patron" ||
          user.Role === "finance" ||
          user.Role === "gerant" ? (
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
          ) : null}

          <a
            style={{
              textDecoration: "none",
              fontFamily: "Courier New",
            }}
            href="#"
            id="navbar-text"
            className=" block px-4 py-2 text-sm  mt-2.5"
            onClick={() => dispatch(Log_out(navigate))}
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
