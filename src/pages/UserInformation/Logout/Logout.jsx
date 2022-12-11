import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../../services/authService";

function Logout() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    auth.logout();
    navigate("/login", { state: null });
  }, [location.pathname, navigate]);

  return null;
}

export default Logout;
