import React, { useEffect } from "react";
import "./BackgroundStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Caisse1 from "./Components/Caisse1";
import Login from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import Economa from "./Components/Economa";
import "./App.css";
import "./mediaQueries.css";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "./Redux/Actions/Users_Action";
import History from "./Components/History";
import Dashboard from "./Components/Dashboard";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrent());
  }, [dispatch]);

  const user = useSelector((state) => state.users.user);

  return (
    <div>
      <Routes>
        {!user.Name ? (
          <Route path="/" element={<Login />} />
        ) : (
          <Route path="/" element={<Caisse1 />} />
        )}
        {!user.Name ? (
          <Route path="/Caisses1" element={<Login />} />
        ) : (
          <>
            <Route path="/Caisses1" element={<Caisse1 />} />
            <Route path="/Economa" element={<Economa />} />
            <Route path="/history" element={<History />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
