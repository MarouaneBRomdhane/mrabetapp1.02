import { ALERTERROR, CLEANERROR } from "../ActionsTypes/User_action_type";

const initialState = [];

export const errorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ALERTERROR:
      return [...state, payload]; //add the payload with the old state
    case CLEANERROR:
      return state.filter((e) => e.id !== payload);
    default:
      return state;
  }
};
