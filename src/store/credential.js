import { createSlice } from "@reduxjs/toolkit";
function getItems() {
  let obj = localStorage.getItem("token");
  if (!obj) {
    return;
  }
  obj = JSON.parse(obj);
  return obj;
}
function getToken() {
  let obj = getItems();
  if (!obj) {
    return "";
  } else {
    return obj.token;
  }
}
function getEmail() {
  let obj = getItems();
  if (!obj) {
    return "";
  } else {
    return obj.email;
  }
}

function checkToken() {
  if (getToken === "") {
    return false;
  } else {
    return true;
  }
}
const initialCrential = {
  token: getItems(),
  isloggedIn: checkToken(),
  email: getEmail(),
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
