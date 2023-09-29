import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const SpecificMail = () => {
  let email = useSelector((state) => state.credential.email);
  const sendMails = useSelector((state) => state.UIshow.sendMails);
  const receivedmails = useSelector((state) => state.UIshow.receivedmails);
  let recievemsg = useSelector((state) => state.UIshow.togglereceivedmsg);
  const params = useParams();
  const { id } = params;
  let specificEmail;
  if (!recievemsg) {
    specificEmail = sendMails.filter((email) => {
      return email.id === id;
    });
  } else {
    specificEmail = receivedmails.filter((email) => {
      return email.id === id;
    });
  }
  specificEmail = specificEmail[0];
  return (
    <>
      <div className="mx-5 mt-2">
        <div>
          <strong>
            {!recievemsg ? specificEmail.receiver : specificEmail.sender}
          </strong>
          &lt;{email}&gt;
        </div>
        <p className="mt-3">{specificEmail.subject}</p>
        <p>{specificEmail.email}</p>
      </div>
    </>
  );
};
export default SpecificMail;
