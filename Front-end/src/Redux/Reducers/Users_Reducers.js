import {
  GETCURRENT,
  GETUSERS,
  LOGIN,
  LOGOUT,
  UPDATEUSER,
} from "../ActionsTypes/User_action_type";

const initialState = { user: {}, users: [] };

export const Users_reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      localStorage.setItem("Token", payload.Token);
      return { ...state, user: payload.User };
    case LOGOUT:
      localStorage.removeItem("Token");
      return { ...state, user: {} };
    case GETCURRENT:
      return { ...state, user: payload.user };
    case GETUSERS:
      return { ...state, users: payload };
    case UPDATEUSER:
      // Find the index of the user in the users array
      const updatedUsers = state.users.map((user) =>
        user._id === payload._id ? payload : user
      );
      return { ...state, user: payload, users: updatedUsers };
    default:
      return state;
  }
};
