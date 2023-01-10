import { useState, Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

const EditGroupStepper = (props) => {
  const { group, steps, Outlet, pathNames } = props;
  const [activeStep, setActiveStep] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const noSteps = (!group.steps ? [] : group.steps).length === 0;

  useEffect(() => {
    if (location.pathname === pathNames.Group) {
      setActiveStep(0);
    } else if (location.pathname === pathNames.Steps) {
      setActiveStep(1);
    } else if (location.pathname === pathNames.Filters) {
      setActiveStep(2);
    }
  }, [group, location, pathNames]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (location.pathname === pathNames.Group) {
      navigate(pathNames.Steps, { state: { groupId: group.id, group: group } });
    } else if (location.pathname === pathNames.Steps) {
      navigate(pathNames.Show);
    }
  };

  const handleBack = () => {
    if (location.pathname === pathNames.Group) {
      navigate(pathNames.Show);
    } else if (location.pathname === pathNames.Steps) {
      navigate(pathNames.Group, { state: { groupId: group.id } });
    } else if (location.pathname === pathNames.Filters) {
      navigate(pathNames.Steps, { state: { group: group } });
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleNext}
            sx={{ mr: 1 }}
          >
            {activeStep === 0
              ? noSteps
                ? "Add Steps"
                : "Manage steps"
              : "Show Job Groups"}
          </Button>
        </div>
        {Outlet}
      </Fragment>
    </Box>
  );
};

export default EditGroupStepper;
