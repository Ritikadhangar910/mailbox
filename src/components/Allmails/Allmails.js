import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import "./Allmails.css";
const Allmails = () => {
  let email = useSelector((state) => state.credential.email);
  const [mail, setMail] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getAllmails() {
      let mail = email.replace(/[@.]/g, "");
      try {
        let response = await axios.get(
          `https://mailboxpost-85c54-default-rtdb.firebaseio.com/${mail}/data.json`
        );
        let arr = [];
        if (response.status === 200) {
          response = response.data;
          for (const item in response) {
            let key = response[item];
            let myobj = {
              ...key.obj,
              id: item,
            };
            arr.push(myobj);
          }
          setMail(arr);
        } else {
          console.log("Error:", response.data);
        }
      } catch (err) {
        console.log("Error:", err);
      }
    }
    getAllmails();
  }, [email]);

  return (
    <>
      <Container fluid>
        <Row>
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
                  <th>Sender</th>
                  <th>Mail</th>
                </tr>
              </thead>
              <tbody>
                {mail.map((item) => (
                  <tr key={item.id}>
                    <td>{item.sender}</td>
                    <td>{item.email}</td>
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
