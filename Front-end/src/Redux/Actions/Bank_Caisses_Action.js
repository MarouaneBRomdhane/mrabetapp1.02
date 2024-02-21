import axios from "axios";
import { GETBANKCAISSES } from "../ActionsTypes/Bankcaisse_action_type";

export const getBank_Caisses = () => async (dispatch) => {
  try {
    await axios
      .get("http://localhost:8000/bank/get")
      .then((res) =>
        dispatch({ type: GETBANKCAISSES, payload: res.data.allBankCaisses })
      );
  } catch (error) {
    console.log("Error", error);
  }
};

export const updateBankCaisse = (id, data) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:8000/bank/update/${id}`, data);
    dispatch(getBank_Caisses());
  } catch (error) {
    console.log(error);
  }
};
