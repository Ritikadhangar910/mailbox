import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const SpecificMail = () => {
  let email = useSelector((state) => state.credential.email);
  const emails = useSelector((state) => state.UIshow.Allmails);
  const params = useParams();
  const { sender } = params;
  let specificEmail = emails.filter((email) => {
    return email.sender === sender;
  });
  specificEmail = specificEmail[0];
  return (
    <>
      <div className="mx-5 mt-2">
        <div>
          <strong>{specificEmail.sender}</strong>
          &lt;{email}&gt;
        </div>
        <p>{specificEmail.email}</p>
      </div>
    </>
  );
};
export default SpecificMail;
