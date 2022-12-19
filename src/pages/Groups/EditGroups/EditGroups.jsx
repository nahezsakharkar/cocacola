import { Outlet } from "react-router-dom";
import OurStepper from "../../../components/Common/OurStepper/OurStepper";
import "../../../custom/css/custom.css";

function EditGroups() {
  // Stepper Steps
  const steps = ["Edit Group", "Edit Steps", "Edit Filters"];

  return (
    <div className="addNewGroup">
      <div className="title">
        <h1 className="Heading">Edit group_name Group</h1>
        <p className="card-description">
          Fields marked with <span className="text-danger">*</span> are required
        </p>
      </div>
      <div className="body border border-secondary rounded">
        <OurStepper steps={steps} Outlet={<Outlet />} onlyBack={true} />
      </div>
    </div>
  );
}

export default EditGroups;
