import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: "", password: "", country: "" });

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
                  onSubmit={navigate("/")}
                >
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <select
                      id="country"
                      className="form-control form-control-lg js-example-basic-single"
                      style={{ width: "100%" }}
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="SriLanka">SriLanka</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="Nepal">Nepal</option>
                    </select>
                  </div>
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-block btn-danger btn-lg font-weight-medium auth-form-btn"
                    >
                      SIGN IN
                    </button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        Keep me signed in
                      </label>
                    </div>
                    <a href=" " className="auth-link text-black">
                      Forgot password?
                    </a>
                  </div>
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
