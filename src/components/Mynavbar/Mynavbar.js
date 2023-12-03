import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { creadentailAction } from "../../store/credential";
import { useNavigate, NavLink } from "react-router-dom";

function Mynavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isloggedIn = useSelector((state) => state.credential.token);

  function logoutHandler() {
    dispatch(creadentailAction.removeToken());
    localStorage.removeItem("token");
    navigate("/auth");
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Mail box</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isloggedIn ? (
              <>
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="/allmails" className="nav-link">
                  All mails
                </NavLink>
                <Button variant="primary" onClick={logoutHandler}>
                  logout
                </Button>
              </>
            ) : (
              <NavLink to="/auth" className="nav-link">
                Signup/Login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Mynavbar;
