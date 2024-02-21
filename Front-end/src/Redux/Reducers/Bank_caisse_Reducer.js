import { GETBANKCAISSES } from "../ActionsTypes/Bankcaisse_action_type";

const initialState = { BankCaisses: [] };

export const BankCaisses_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case GETBANKCAISSES:
      return { ...state, BankCaisses: payload };

    default:
      return state;
  }
};
