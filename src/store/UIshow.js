import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
const initialUI = {
  Allmails: [],
  showStar: [],
};
const UIslice = createSlice({
  name: "UIshow",
  initialState: initialUI,
  reducers: {
    showallMails(state, action) {
      state.Allmails = action.payload;
    },
    anothershowStar(state, action) {
      state.showStar.push(action.payload);
    },
    Hideshowstar(state, action) {
      state.Allmails = action.payload;
    },
  },
});
export const UIshowaction = UIslice.actions;
export default UIslice.reducer;
export function getAllmails(mail) {
  return async function getAllmailsThunk(dispatch, getState) {
    try {
      let response = await axios.get(
        `https://mailboxpost-85c54-default-rtdb.firebaseio.com/${mail}/data.json`
      );
      let arr = [];
      if (response.status === 200) {
        response = response.data;
        const keys = Object.keys(response);
        for (const key of keys) {
          let item = response[key];
          let myobj = {
            ...item.obj,
            id: key,
          };
          arr.push(myobj);
        }
        dispatch(UIshowaction.showallMails(arr));
      } else {
        console.log("Error:", response.data);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };
}
