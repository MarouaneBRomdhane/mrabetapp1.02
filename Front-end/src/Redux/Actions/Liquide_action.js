import axios from "axios";
import { GETLIQUIDE } from "../ActionsTypes/Liquide_action_type";

export const getLiquide = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/liquide/get/");
    dispatch({ type: GETLIQUIDE, payload: res.data.LiquideDisponible });
  } catch (error) {
    console.log(error);
  }
};

export const updateLiquide = (id, data) => async (dispatch) => {
  try {
    await axios.put(`/api/liquide/update/${id}`, data);
    dispatch(getLiquide());
  } catch (error) {
    console.log(error);
  }
};
