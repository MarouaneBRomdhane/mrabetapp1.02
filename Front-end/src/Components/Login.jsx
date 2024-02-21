import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Login_action } from "../Redux/Actions/Users_Action";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const Login = () => {
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleLogin = () => {
    dispatch(Login_action({ Name, Password }, Navigate));
  };
  const errors = useSelector((state) => state.errorReducer);
  console.log(errors);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          width: "30rem",
          marginTop: "200px",
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
              fontSize: "3rem",
            }}
          >
            Connexion
          </Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#FFF7D6", fontSize: "25px" }}>
                Nom d'utlisateur
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Taper votre Nom d'utilisateur"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              id="App"
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label style={{ color: "#FFF7D6", fontSize: "25px" }}>
                Mot de passe
              </Form.Label>
              <div
                style={{
                  display: "flex",
                }}
              >
                <Form.Control
                  style={{
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    backgroundColor: "#f4f2f2",
                    border: "none",
                    color: "black",
                    padding: "0.7rem 1rem",
                    borderRadius: "5px",
                    width: "27.875em",
                    transition: "all ease-in-out .5s",
                    marginRight: "-2rem",
                    height: "38px",
                  }}
                  value={Password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Taper votre mot de passe"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                  style={{
                    border: "none",
                    backgroundColor: "#f4f2f2",
                    marginTop: ".1em",
                  }}
                >
                  {showPassword ? (
                    <IoIosEye
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <IoIosEyeOff
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </button>
              </div>
            </Form.Group>
          </Form>
          {errors.map((e) => (
            <span key={e.msg} style={{ color: "#a00a0a" }}>
              {e.msg}
            </span>
          ))}
          <Button className="BTN-LOGIN" onClick={handleLogin}>
            Se connecter
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
