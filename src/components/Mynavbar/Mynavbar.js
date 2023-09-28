import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { creadentailAction } from "../../store/credential";
import { useNavigate } from "react-router-dom";
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
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/allmails">All mails</Nav.Link>
                <Button variant="primary" onClick={logoutHandler}>
                  logout
                </Button>
              </>
            ) : (
              <Nav.Link href="/auth">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Mynavbar;
