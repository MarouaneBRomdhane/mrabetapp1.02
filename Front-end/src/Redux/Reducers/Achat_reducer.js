import { GETPRODUCT } from "../ActionsTypes/Achat_action_type";

const initialState = { products: [] };

export const Products_reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GETPRODUCT:
      return { ...state, products: payload };

    default:
      return state;
  }
};
