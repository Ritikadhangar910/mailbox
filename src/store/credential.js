import { createSlice } from "@reduxjs/toolkit";
function getItems() {
  let token = localStorage.getItem("token");
  return token;
}
function checkToken() {
  if (getItems === "") {
    return false;
  } else {
    return true;
  }
}
const initialCrential = {
  token: getItems(),
  isloggedIn: checkToken(),
};
const creadentailSlice = createSlice({
  name: "credential",
  initialState: initialCrential,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      state.isloggedIn = true;
    },
    removeToken(state) {
      state.token = "";
      state.isloggedIn = false;
    },
  },
});
export const creadentailAction = creadentailSlice.actions;
export default creadentailSlice.reducer;
