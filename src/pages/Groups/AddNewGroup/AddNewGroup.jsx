import { Outlet } from "react-router-dom";
import AddGroupStepper from "../../../components/Common/OurSteppers/AddGroupStepper";
import "../../../custom/css/custom.css";

function AddNewGroup() {
  // Stepper Steps
  const steps = ["Create New Group", "Add Steps", "Add Filters"];
  const pathNames = {Group: "/AddNewGroup/AddGroup", Steps: "/AddNewGroup/AddStep", Filters: "/AddNewGroup/AddFilter"}

  return (
    <div className="addNewGroup" style={{scale : ".8"}}>
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
