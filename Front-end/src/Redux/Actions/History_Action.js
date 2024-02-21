import axios from "axios";
import { GETHISTORY } from "../ActionsTypes/History_action_type";

export const getHistory = () => async (dispatch) => {
  try {
    await axios
      .get("/api/history/get")
      .then((res) =>
        dispatch({ type: GETHISTORY, payload: res.data.allHistories })
      );
  } catch (error) {
    console.log("Error", error);
  }
};
