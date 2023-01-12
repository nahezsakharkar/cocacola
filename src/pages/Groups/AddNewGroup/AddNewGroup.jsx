import { useLocation, Outlet } from "react-router-dom";
import AddGroupStepper from "../../../components/Common/OurSteppers/AddGroupStepper";
import "../../../custom/css/custom.css";

function AddNewGroup() {
  const location = useLocation();
  // Stepper Steps
  const steps = ["Create New Group", "Add Steps", "Add Filters"];
  const pathNames = {
    Group: "/AddNewGroup/AddGroup",
    Steps: "/AddNewGroup/AddStep",
    Filters: "/AddNewGroup/AddFilter",
  };

  return (
    <div
      className="addNewGroup"
      style={{
        scale: ".8",
        margin:
          location.pathname === pathNames.Steps
            ? "-130px -160px"
            : location.pathname === pathNames.Filters
            ? "-100px -160px"
            : "-70px -160px",
      }}
    >
      <div className="title">
        <h1 className="Heading">Add New Group</h1>
        <p className="card-description">
          Fields marked with <span className="text-danger">*</span> are required
        </p>
      </div>
      <div className="body border border-secondary rounded">
        <AddGroupStepper
          steps={steps}
          Outlet={<Outlet />}
          pathNames={pathNames}
          onlyBack={true}
        />
      </div>
    </div>
  );
}

export default AddNewGroup;
