import { GETCAISSEEVENT } from "../ActionsTypes/CaisseEvent_action_type";

const initialState = { caisses: [] };

export const CaissesEvent_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case GETCAISSEEVENT:
      return { ...state, caisses: payload };

    default:
      return state;
  }
};
