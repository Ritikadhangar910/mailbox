import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classess from "./Auth.module.css";
import { useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useDispatch } from "react-redux";
import { creadentailAction } from "../../store/credential";
import { useNavigate } from "react-router-dom";
function Auth() {
  const email = useRef();
  const pass = useRef();
  const dispatch = useDispatch();
  const confirmpass = useRef();
  const navigate = useNavigate();
  const [errEmptyform, seterrEmptyform] = useState(false);
  const [errpassNotMatch, seterrpassNotMatch] = useState(false);
  const [errAuth, seterrAuth] = useState(false);
  const [errAuthmsg, seterrAuthmsg] = useState(null);
  const [togglesignup, setTogglesignup] = useState(true);
  function AuthformSummit(e) {
    e.preventDefault();
    let emailval = email.current.value;
    let passval = pass.current.value;
    if (togglesignup) {
      let confirmpassval = confirmpass.current.value;
      if (passval !== confirmpassval) {
        seterrpassNotMatch(true);
      } else {
        seterrpassNotMatch(false);
      }
    }

    if (emailval.length === 0 || passval.length <= 5) {
      seterrEmptyform(true);
    } else {
      seterrEmptyform(false);
    }

    if (!errEmptyform && !errpassNotMatch) {
      FirebaseAuthSummit();
    }
  }
  async function FirebaseAuthSummit() {
    let emailval = email.current.value;
    let passval = pass.current.value;
    let authLink = "";
    if (togglesignup) {
      authLink = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPaaQCCEk5bOP1J4-CNBIxxwflpeCl_pE`;
    } else {
      authLink = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPaaQCCEk5bOP1J4-CNBIxxwflpeCl_pE`;
    }
    try {
      let response = await axios.post(
        authLink,
        {
          email: emailval,
          password: passval,
          returnSecureToken: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        console.log("Error :", response.data);
        seterrAuth(true);
        seterrAuthmsg("invalid Credential");
      } else {
        localStorage.setItem("token", response.data.idToken);
        dispatch(creadentailAction.setToken(response.data.idToken));
        navigate("/");
        console.log("user successfully logged in");
        seterrAuth(false);
      }
    } catch (err) {
      const errmsg = "invalid Credential";
      seterrAuth(true);
      seterrAuthmsg(errmsg);
      console.log("Error :", err);
    }
  }
  function togglesignupHandler() {
    setTogglesignup((prev) => {
      return !prev;
    });
  }
  return (
    <>
      {errpassNotMatch && (
        <Alert variant="warning">password are not matching</Alert>
      )}
      {errEmptyform && <Alert variant="warning">fill all fields</Alert>}
      {errAuth && <Alert variant="warning">{errAuthmsg}</Alert>}
      <div className={classess.authcover}>
        <h3>{togglesignup ? "SignUp form" : "Login form"}</h3>
        <Form className={classess.form} onSubmit={AuthformSummit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={email} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={pass} />
          </Form.Group>
          {togglesignup ? (
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={confirmpass}
              />
            </Form.Group>
          ) : null}
          <Button variant="primary" type="submit">
            {togglesignup ? "Sign Up" : "Login"}
          </Button>
        </Form>
        <Button
          variant="primary"
          onClick={togglesignupHandler}
          className="mt-3"
        >
          {togglesignup
            ? "Have you account?Login"
            : "don't you have account?SignUp"}
        </Button>
      </div>
    </>
  );
}

export default Auth;
