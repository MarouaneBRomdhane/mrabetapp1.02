import axios from "axios";

import {
  CREATEAVNACE,
  GETAVANCE,
  UPDATEAVANCE,
} from "../ActionsTypes/Avance_action_type";

export const createAvance = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/avance/create",
      data
    );
    dispatch({
      type: CREATEAVNACE,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error creating avance:", error);
  }
};

export const getAvance = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:8000/avance/get");
    dispatch({
      type: GETAVANCE,
      payload: response.data.allDemandeAvance,
    });
  } catch (error) {
    console.error("Error getting avance:", error);
  }
};

export const updateAvance = (id, data) => async (dispatch) => {
  try {
    const response = await axios.put(
      "http://localhost:8000/avance/update/" + id,
      data
    );
    dispatch({
      type: UPDATEAVANCE,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error updating avance:", error);
  }
};
