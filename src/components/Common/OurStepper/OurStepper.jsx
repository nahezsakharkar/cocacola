import { useState, Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

const OurStepper = (props) => {
  const { steps, Outlet, onlyBack } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [hideBack, setHideBack] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/AddNewGroup/AddGroup") {
      setActiveStep(0);
      setHideBack(true);
    } else if (location.pathname === "/AddNewGroup/AddStep") {
      setActiveStep(1);
      setHideBack(false);
    } else if (location.pathname === "/AddNewGroup/AddFilter") {
      setActiveStep(2);
      setHideBack(false);
    }
  }, [location.pathname]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (location.pathname === "/AddNewGroup/AddStep") {
      navigate("/AddNewGroup/AddGroup");
    } else if (location.pathname === "/AddNewGroup/AddFilter") {
      navigate("/AddNewGroup/AddStep");
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Fragment>
        {hideBack || (
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
        )}
        <Box sx={{ flex: "1 1 auto" }} />

        {onlyBack || (
          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        )}
        {Outlet}
      </Fragment>
    </Box>
  );
};

export default OurStepper;
