import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import constantsService from "../../services/constantsService";
import Loader from "../../components/Common/Loader/Loader";
import auth from "../../services/authService";

import { TextField } from "@mui/material";
// import Select from "react-select";

import { useFormik } from "formik";
import * as Yup from "yup";
// import constants from "../../custom/constants/constants";
const { dynamicBaseURLPORT } = constantsService;

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .email("Please Enter A Valid Email Address"),
  password: Yup.string().required("Password is required"),
  // companyid: Yup.number().required("Company Id is required"),
});

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // const optionsForCompanyId = [
  //   {
  //     target: JSON.parse('{"id":"companyid", "value":"1428"}'),
  //     value: "1428",
  //     label: "SriLanka",
  //   },
  //   {
  //     target: JSON.parse('{"id":"companyid", "value":"1364"}'),
  //     value: "1364",
  //     label: "Bangladesh",
  //   },
  //   {
  //     target: JSON.parse('{"id":"companyid", "value":"1429"}'),
  //     value: "1429",
  //     label: "Nepal - A",
  //   },
  //   {
  //     target: JSON.parse('{"id":"companyid", "value":"1430"}'),
  //     value: "1430",
  //     label: "Nepal - B",
  //   },
  // ];

  const handleSubmit = async () => {
    try {
      let data = await auth.login(values);
      setIsLoading(false);
      auth.setBaseURL(dynamicBaseURLPORT(data.companyid));
      navigate(location.state || "/");
      window.location.reload(false);
    } catch (e) {
      setIsLoading(false);
      console.log("error :", e);
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit: handleSubmitFormik,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
      // companyid: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      setIsLoading(true);
      handleSubmit();
    },
  });

  return (
    <div className="container-scroller">
      <Loader open={isLoading} />
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
                <form className="myForms cmxform pt-3" id="commentForm">
                  <div className="form-group">
                    <TextField
                      error={errors.username ? true : false}
                      id="username"
                      placeholder="Username"
                      onChange={handleChange}
                      helperText={errors.username}
                      variant="outlined"
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      error={errors.password ? true : false}
                      id="password"
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                      helperText={errors.password}
                      variant="outlined"
                    />
                  </div>
                  {/* <div className="form-group">
                    <Select
                      styles={constants.reactSelectStyles(errors.companyid)}
                      inputId="companyid"
                      options={optionsForCompanyId}
                      onChange={handleChange}
                      className="search-options"
                      placeholder="Select Country..."
                      // defaultValue={{
                      //   target: JSON.parse('{"id":"companyid", "value":""}'),
                      //   value: "",
                      //   label: "Select Country...",
                      // }}
                    />
                    {errors.companyid && (
                      <p className="helperText">{errors.companyid}</p>
                    )}
                  </div> */}
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
