import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../services/authService";
import { toast } from "react-toastify";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    companyid: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleSubmit = async () => {
    for (let properties in formValues) {
      if (formValues[properties].length === 0) {
        let displayName;
        if (properties === "username") {
          displayName = "Username";
        } else if (properties === "password") {
          displayName = "Password";
        } else if (properties === "companyid") {
          displayName = "Country";
        }
        toast.error(
          displayName +
            " field is empty. Please Check Credentials and Try Again!"
        );
      }
    }
    await auth.login(formValues);
    navigate(location.state || "/");
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth">
          <div className="row w-100">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left p-5">
                <div className="brand-logo">
                  <img src="Assets/logo-wide.png" alt="logo" />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <form
                  className="cmxform pt-3"
                  id="commentForm"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="username"
                      placeholder="Username"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      placeholder="Password"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <select
                      id="companyid"
                      className="form-control form-control-lg"
                      style={{ width: "100%" }}
                      onChange={handleChange}
                      required
                    >
                      <option value={""}>Select Country</option>
                      <option value={1428}>SriLanka</option>
                      <option value={1364}>Bangladesh</option>
                      <option value={1429}>Nepal - A</option>
                      <option value={1430}>Nepal - B</option>
                    </select>
                  </div>
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-block btn-danger btn-lg font-weight-medium auth-form-btn"
                      onClick={handleSubmit}
                    >
                      SIGN IN
                    </button>
                  </div>
                  {/* <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        Keep me signed in
                      </label>
                    </div>
                    <a href=" " className="auth-link text-black">
                      Forgot password?
                    </a>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
