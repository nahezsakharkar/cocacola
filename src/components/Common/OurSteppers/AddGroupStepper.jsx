import { useState, Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

const AddGroupStepper = (props) => {
  const { steps, Outlet, pathNames, onlyBack } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [hideBack, setHideBack] = useState(true);
  const [addStepPageState, setAddStepPageState] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === pathNames.Group) {
      setActiveStep(0);
      setHideBack(true);
    } else if (location.pathname === pathNames.Steps) {
      setActiveStep(1);
      setHideBack(false);
      setAddStepPageState(location.state.group);
    } else if (location.pathname === pathNames.Filters) {
      setActiveStep(2);
      setHideBack(false);
    }
  }, [location.pathname, location.state, pathNames.Filters, pathNames.Group, pathNames.Steps]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (location.pathname === pathNames.Steps) {
      navigate(pathNames.Group);
    } else if (location.pathname === pathNames.Filters) {
      navigate(pathNames.Steps, { state: { group: addStepPageState } });
    }
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} sx={{ paddingBottom: "1rem" }}>
        {steps.map((label, index) => {
          const stepProps = {
            sx: {
              ".MuiStepLabel-iconContainer": {
                svg: {
                  color: "#f02632",
                },
              },
            },
          };
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
            variant="outlined"
            color="error"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
        )}
        <Box sx={{ paddingBottom: "1rem" }} />

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

export default AddGroupStepper;
