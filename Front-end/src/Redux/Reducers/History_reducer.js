import { GETHISTORY } from "../ActionsTypes/History_action_type";

const initialState = { histories: [] };

export const History_reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GETHISTORY:
      return { ...state, histories: payload };

    default:
      return state;
  }
};
