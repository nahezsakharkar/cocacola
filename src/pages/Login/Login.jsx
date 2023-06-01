import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Common/Loader/Loader";
import auth from "../../services/authService";

import { TextField } from "@mui/material";
// import Select from "react-select";

import { useFormik } from "formik";
import * as Yup from "yup";
// import constants from "../../custom/constants/constants";

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
      // if (data.companyid === "1428,1429,1430,1364") {
      //   window.location.href = "https://twitter.com/";
      // } else if (data.companyid === "1428,1429,1430") {
      //   window.location.href = "https://gmail.com/";
      // } else if (data.companyid === "1428,1429,1364") {
      //   window.location.href = "https://amazon.in/";
      // } else if (data.companyid === "1428,1430,1364") {
      //   window.location.href = "https://flipkart.com/";
      // } else if (data.companyid === "1429,1430,1364") {
      //   window.location.href = "https://myntra.com/";
      // } else if (data.companyid === "1428,1429") {
      //   window.location.href = "https://olx.in/";
      // } else if (data.companyid === "1428,1430") {
      //   window.location.href = "https://zomato.com/";
      // } else if (data.companyid === "1428,1364") {
      //   window.location.href = "https://swiggy.com/";
      // } else if (data.companyid === "1429,1430") {
      //   window.location.href = "https://bookmyshow.com/";
      // } else if (data.companyid === "1429,1364") {
      //   window.location.href = "https://yatra.com/";
      // } else if (data.companyid === "1430,1364") {
      //   window.location.href = "https://snaodeal.com/";
      // } else if (data.companyid === "1428") {
      //   window.location.href = "https://facebook.com/";
      // } else if (data.companyid === "1429") {
      //   window.location.href = "https://google.com/";
      // } else if (data.companyid === "1430") {
      //   window.location.href = "https://riotgames.com/";
      // } else if (data.companyid === "1364") {
      //   window.location.href = "https://india.gov.in/";
      // }
      if (data.companyid === "1428") {
        auth.setBaseURL(7071);
      } else if (data.companyid === "1429,1430") {
        auth.setBaseURL(7070);
      } else if (data.companyid === "1429") {
        auth.setBaseURL(7070);
      } else if (data.companyid === "1430") {
        auth.setBaseURL(7070);
      }
      navigate(location.state || "/");
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
