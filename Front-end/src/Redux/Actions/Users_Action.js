import axios from "axios";
import {
  GETCURRENT,
  GETUSERS,
  LOGIN,
  LOGOUT,
  // UPDATEUSER,
} from "../ActionsTypes/User_action_type";
import { alertError } from "../ActionsTypes/ActiontypeError";

export const Login_action = (data, Navigate) => async (dispatch) => {
  try {
    await axios
      .post("http://localhost:8000/user/login", data)
      .then((res) => dispatch({ type: LOGIN, payload: res.data }));
    Navigate("/dashboard");
  } catch (error) {
    error.response.data.errors.forEach((e) => {
      dispatch(alertError(e.msg));
    });
  }
};

export const Log_out = (Navigate) => {
  Navigate("/");
  return {
    type: LOGOUT,
  };
};

export const getCurrent = () => async (dispatch) => {
  const config = {
    headers: { token: localStorage.getItem("Token") },
  };
  try {
    await axios
      .get("http://localhost:8000/user/getCurrentUser", config)
      .then((res) => dispatch({ type: GETCURRENT, payload: res.data }));
  } catch (error) {}
};

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8000/user/get");
    dispatch({ type: GETUSERS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (id, data) => async (dispatch) => {
  try {
    await axios.put(" http://localhost:8000/user/update/" + id, data);
    dispatch(getUsers());
    dispatch(getCurrent());
  } catch (error) {
    console.error(error);
  }
};
