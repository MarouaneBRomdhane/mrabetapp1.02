import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk"; // Correct import statement
import { combineReducers } from "redux";
import { Users_reducer } from "./Reducers/Users_Reducers";
import { Caisses1_reducer } from "./Reducers/Caisse1_reducer";
import { CaissesEvent_reducer } from "./Reducers/CaisseEvent_reducer";
import { Products_reducer } from "./Reducers/Achat_reducer";
import { BankCaisses_reducer } from "./Reducers/Bank_caisse_Reducer";
import { errorReducer } from "./Reducers/ReducerError";
import { LiquideReducer } from "./Reducers/Liquide_Reducer";
import { History_reducer } from "./Reducers/History_reducer";
import { Avance_Reducer } from "./Reducers/Avance_reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  errorReducer: errorReducer,
  users: Users_reducer,
  caisses1: Caisses1_reducer,
  caissesEvent: CaissesEvent_reducer,
  Products: Products_reducer,
  BankCaisses: BankCaisses_reducer,
  Liquide: LiquideReducer,
  history: History_reducer,
  avance: Avance_Reducer,

  // houni Nzidou les reducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
