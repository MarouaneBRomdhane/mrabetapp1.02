import { GETLIQUIDE } from "../ActionsTypes/Liquide_action_type";

const initialState = { liquide: [] };

export const LiquideReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GETLIQUIDE:
      return { ...state, liquide: payload };

    default:
      return state;
  }
};
