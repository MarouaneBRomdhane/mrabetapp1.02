import {
  CREATEAVNACE,
  GETAVANCE,
  UPDATEAVANCE,
} from "../ActionsTypes/Avance_action_type";

const initialState = { avanceList: [] };

export const Avance_Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATEAVNACE:
      return {
        ...state,
        avanceList: [...state.avanceList, payload.demandeAvance],
      };

    case GETAVANCE:
      return { ...state, avanceList: payload };

    case UPDATEAVANCE:
      const updatedAvanceList = state.avanceList.map((avance) =>
        avance._id === payload._id ? payload : avance
      );

      return { ...state, avanceList: updatedAvanceList };

    default:
      return state;
  }
};
