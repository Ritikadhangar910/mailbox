import { configureStore } from "@reduxjs/toolkit";
import credentialReduer from "./credential";
const store = configureStore({
  reducer: { credential: credentialReduer },
});
export default store;
