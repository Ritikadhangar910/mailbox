import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { useNavigate, Link } from "react-router-dom";
import { getAllmails } from "../../store/UIshow";
import { UIshowaction } from "../../store/UIshow";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./Allmails.css";
const Allmails = () => {
  let email = useSelector((state) => state.credential.email);
  let allmails = useSelector((state) => state.UIshow.Allmails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let mail = email.replace(/[@.]/g, "");
    dispatch(getAllmails(mail));
  }, [email, dispatch]);
  async function hideStar(item) {
    let mail = email.replace(/[@.]/g, "");
    const obj = {
      email: item.email,
      sender: item.sender,
      showstar: false,
    };
    try {
      let response = await axios.put(
        `https://mailboxpost-85c54-default-rtdb.firebaseio.com/${mail}/data/${item.id}.json`,
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
        console.log("Error is", response.data);
      }
    } catch (err) {
      console.log("Error is", err);
    }
    const getMail = allmails.findIndex((email) => {
      return email.id === item.id;
    });
    const copyAllmails = [...allmails];
    const objCopy = { ...copyAllmails[getMail] };
    objCopy.showstar = false;
    copyAllmails[getMail] = objCopy;
    dispatch(UIshowaction.Hideshowstar(copyAllmails));
  }
  async function deleteMail(id) {
    let mail = email.replace(/[@.]/g, "");
    try {
      let response = await axios.delete(
        `https://mailboxpost-85c54-default-rtdb.firebaseio.com/${mail}/data/${id}.json`
      );
      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.log("Error is", response.data);
      }
    } catch (err) {
      console.log("Error is", err);
    }
    const copyAllmails = [...allmails];
    const getMail = copyAllmails.filter((email) => {
      return email.id !== id;
    });
    dispatch(UIshowaction.Hideshowstar(getMail));
  }
  return (
    <>
      <Container fluid>
        <Row className="mx-5">
          <Col md="3">
            <button
              className="compose"
              onClick={() => {
                navigate("/");
              }}
            >
              Compose
            </button>
          </Col>
          <Col md="9">
            <Table bordered hover>
              <thead>
                <tr>
                  <th style={{ border: "none" }}>Sender</th>
                  <th style={{ border: "none" }}>Mail</th>
                </tr>
              </thead>
              <tbody>
                {allmails.map((item) => (
                  <tr key={item.id}>
                    <td style={{ border: "none" }}>
                      {item.showstar ? (
                        <span className="golden-text">★</span>
                      ) : (
                        "  "
                      )}
                      {item.sender}
                    </td>
                    <td
                      style={{ border: "none" }}
                      className="text-with-ellipsis setcursor"
                      onClick={() => hideStar(item)}
                    >
                      <Link
                        to={`/allmails/${item.sender}`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        {item.email}
                      </Link>
                    </td>
                    <td style={{ border: "none" }}>
                      <Button
                        variant="danger"
                        onClick={() => deleteMail(item.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Allmails;
