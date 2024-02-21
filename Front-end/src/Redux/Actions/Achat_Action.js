import axios from "axios";
import { GETPRODUCT } from "../ActionsTypes/Achat_action_type";

export const getProducts = () => async (dispatch) => {
  try {
    await axios
      .get("http://localhost:8000/achat/get")
      .then((res) =>
        dispatch({ type: GETPRODUCT, payload: res.data.allProducts })
      );
  } catch (error) {
    console.log("Error", error);
  }
};

export const addProducts = (data) => async (dispatch) => {
  try {
    await axios
      .post("http://localhost:8000/achat/create", data)
      .then((res) => dispatch(getProducts()));
  } catch (error) {
    console.log(error);
  }
};

export const updateProducts = (id, data) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:8000/caisse/update/${id}`, data);
    dispatch(getProducts());
  } catch (error) {
    console.log(error);
  }
};
