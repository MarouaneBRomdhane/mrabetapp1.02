import { ALERTERROR, CLEANERROR } from "./User_action_type";

export const alertError = (msg) => (dispatch) => {
  const id = Math.random(); //generate a number between 0 et 1
  dispatch({ type: ALERTERROR, payload: { msg, id } });
  setTimeout(() => {
    dispatch({ type: CLEANERROR, payload: id });
  }, 5000);
};
