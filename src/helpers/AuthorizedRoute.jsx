import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Common/Loader/Loader";
import auth from "../services/authService";

export const AuthorizedRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  //   const [admin, setAdmin] = useState({});

  async function getAdmin() {
    const data = await auth.getCurrentUserDetails();
    setIsLoading(false);
    if (data.payload.admintype) {
      if (data.payload.admintype === "Admin") {
        navigate(location.pathname);
      } else {
        navigate("/");
      }
    }
  }

  useEffect(() => {
    getAdmin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
      <Loader open={isLoading} />
      {isLoading || children}
    </>
  );
};
