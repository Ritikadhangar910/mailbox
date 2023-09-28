import { configureStore } from "@reduxjs/toolkit";
import credentialReduer from "./credential";
import UIshowReducer from "./UIshow";
const store = configureStore({
  reducer: { credential: credentialReduer, UIshow: UIshowReducer },
});
export default store;
