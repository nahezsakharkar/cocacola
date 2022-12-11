import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../services/authService";

export const LoggedRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/login") {
      if (auth.getCurrentUser()) {
        navigate("/");
      }
    }
  }, [location.pathname, navigate]);

  return children;
};
