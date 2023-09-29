import React, { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { UIshowaction } from "../../store/UIshow";
import axios from "axios";

const Home = () => {
  let email = useSelector((state) => state.credential.email);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  function GetTextformEditor() {
    const plainText = extractPlainTextFromHTML(text);
    storeEmail(plainText);
  }
  function extractPlainTextFromHTML(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  }
  async function storeEmail(text) {
    const newsender = sender.substring(3);
    const newemail = newsender.replace(/[@.]/g, "");
    const obj = {
      email: text,
      sender: email,
      receiver: newsender,
      subject: subject,
      showstar: true,
    };

    try {
      let response = await axios.post(
        `https://mailboxpost-85c54-default-rtdb.firebaseio.com/${newemail}/send.json`,
        {
          obj,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.log("Error:", response.data, response.status);
      }
    } catch (err) {
      console.log("Error:", err);
    }
    let replaceEmail = email.replace(/[@.]/g, "");
    try {
      let response = await axios.post(
        `https://mailboxpost-85c54-default-rtdb.firebaseio.com/${replaceEmail}/allsendmail.json`,
        {
          obj,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        const sendobj = { id: response.data.name, ...obj };
        dispatch(UIshowaction.AddsendMails(sendobj));
        console.log(sendobj, "sendobj");
      } else {
        console.log("Error:", response.data, response.status);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  }

  return (
    <>
      <div className="emailbox">
        <div className="forwidth">
          <h2>Email Send</h2>
          <div className="mail-box">
            <small className="text-email">
              <textarea
                id="plainText"
                style={{
                  border: "none",
                  outline: "none",
                  height: "20px",
                  width: "100%",
                  resize: "none",
                }}
                defaultValue={"To"}
                onChange={(e) => {
                  setSender(e.target.value);
                }}
              ></textarea>
            </small>
            <small className="text-email2">Cc/Bcc</small>

            <small className="text-email mt-3">
              <textarea
                id="plainText"
                style={{
                  border: "none",
                  outline: "none",
                  height: "20px",
                  width: "100%",
                  resize: "none",
                }}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              ></textarea>
            </small>

            <div>
              <SunEditor
                autoFocus={true}
                width="700"
                height="200"
                setDefaultStyle="font-size:16px"
                onChange={(text) => setText(text)}
              />
            </div>
            <button onClick={GetTextformEditor} className="sendbtn">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
