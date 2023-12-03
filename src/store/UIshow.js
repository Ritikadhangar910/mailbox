import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
const initialUI = {
  receivedmails: [],
  sendMails: [],
  togglereceivedmsg: true,
};
const UIslice = createSlice({
  name: "UIshow",
  initialState: initialUI,
  reducers: {
    receiveallMails(state, action) {
      state.receivedmails = action.payload;
    },

    HidestarReceived(state, action) {
      state.receivedmails = action.payload;
    },
    AddsendMails(state, action) {
      state.sendMails.push(action.payload);
    },
    HidestarSend(state, action) {
      state.sendMails = action.payload;
    },
    receivedMailHandler(state, action) {
      state.togglereceivedmsg = action.payload;
    },
  },
});
export const UIshowaction = UIslice.actions;
export default UIslice.reducer;
export function getAllReceivedmails(link) {
  return async function getAllmailsThunk(dispatch, getState) {
    try {
      let response = await axios.get(link);
      let arr = [];
      if (response.status === 200) {
        const data = response.data;
        if (data !== null && data !== undefined) {
          const keys = Object.keys(data);
          for (const key of keys) {
            let item = data[key];
            let myobj = {
              ...item.obj,
              id: key,
            };
            arr.push(myobj);
          }
          dispatch(UIshowaction.receiveallMails(arr));
        } else {
          console.log("response is null");
        }
      } else {
        console.log("Error:", response.data);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };
}
export function getAllSendmails(link) {
  return async function getAllmailsThunk(dispatch, getState) {
    try {
      let response = await axios.get(link);
      let arr = [];
      if (response.status === 200) {
        const data = response.data;
        if (data !== null && data !== undefined) {
          const keys = Object.keys(data);
          for (const key of keys) {
            let item = data[key];
            let myobj = {
              ...item.obj,
              id: key,
            };
            arr.push(myobj);
          }
          dispatch(UIshowaction.HidestarSend(arr));
        } else {
          console.log("response is null");
        }
      } else {
        console.log("Error:", response.data);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };
}
