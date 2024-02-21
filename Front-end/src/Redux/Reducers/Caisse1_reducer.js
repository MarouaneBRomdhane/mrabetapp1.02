import { GETCAISSE1 } from "../ActionsTypes/Caisse1_action_type";

const initialState = { caisses: [] };

export const Caisses1_reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GETCAISSE1:
      return { ...state, caisses: payload };

    default:
      return state;
  }
};
