import { useContext, useEffect } from "react";
import UserContext from "../../../context/user/userContext";

function Account() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    setTimeout(() => {
      setCurrentUser({
        email: "hahahahah no email for u",
      });
    }, 3000);
  }, [setCurrentUser]);
  return <div>This is about {currentUser.email}</div>;
}

export default Account;
