import axios from "axios";
import { GETCAISSEEVENT } from "../ActionsTypes/CaisseEvent_action_type";

export const getCaissesEvent = () => async (dispatch) => {
  try {
    await axios
      .get("http://localhost:8000/caisseEvent/get")
      .then((res) =>
        dispatch({ type: GETCAISSEEVENT, payload: res.data.allCaisses })
      );
  } catch (error) {
    console.log("Error", error);
  }
};

export const updateCaisseEvent = (id, data) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:8000/caisseEvent/update/${id}`, data);
    dispatch(getCaissesEvent());
  } catch (error) {
    console.log(error);
  }
};
