import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../services/authService";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .email("Please Enter A Valid Email Address"),
  password: Yup.string().required("Password is required"),
  companyid: Yup.number().required("Company Id is required"),
});

function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
      try {
        await auth.login(values);
        navigate(location.state || "/");
      } catch (e) {
        console.log("error :", e);
      }
  };

  const {values,errors,handleSubmit: handleSubmitFormik,handleChange} = useFormik({
    initialValues: {
      username: "",
      password: "",
      companyid: "",
    },
    validationSchema: LoginSchema,
    onSubmit : () => {
      handleSubmit();
    }
  });

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
                <form className="cmxform pt-3" id="commentForm">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="username"
                      placeholder="Username"
                      onChange={handleChange}
                    />
                    {errors.username && (
                      <small className="form-text text-danger">
                        {errors.username}
                      </small>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      placeholder="Password"
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <small className="form-text text-danger">
                        {errors.password}
                      </small>
                    )}
                  </div>
                  <div className="form-group">
                    <select
                      id="companyid"
                      className="form-control form-control-lg"
                      style={{ width: "100%" }}
                      onChange={handleChange}
                    >
                      <option value={""}>Select Country</option>
                      <option value={1428}>SriLanka</option>
                      <option value={1364}>Bangladesh</option>
                      <option value={1429}>Nepal - A</option>
                      <option value={1430}>Nepal - B</option>
                    </select>
                    {errors.companyid && (
                      <small className="form-text text-danger">
                        {errors.companyid}
                      </small>
                    )}
                  </div>
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-block btn-danger btn-lg font-weight-medium auth-form-btn"
                      onClick={handleSubmitFormik}
                    >
                      SIGN IN
                    </button>
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
