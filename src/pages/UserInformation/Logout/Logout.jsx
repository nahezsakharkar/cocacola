import { useEffect } from "react";
import auth from "../../../services/authService";

function Logout() {
  useEffect(() => {
    auth.logout();
  }, []);

  return null;
}

export default Logout;
