import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import OurStepper from "../../../components/Common/OurStepper/OurStepper";
import schedule from "../../../services/scheduleService";
import Loader from "../../../components/Common/Loader/Loader";
import "../../../custom/css/custom.css";

function EditGroups() {
  // Stepper Steps
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state;
  const [isLoading, setIsLoading] = useState(true);

  const [group, setGroup] = useState({});
  const steps = ["Edit Group", "Edit Steps", "Edit Filters"];
  const pathNames = {
    Group: "/ShowGroups/EditGroups/EditGroup",
    Steps: "/ShowGroups/EditGroups/EditSteps",
    Filters: "/ShowGroups/EditGroups/EditFilters",
  };

  async function getGroup(id) {
    const data = await schedule.getGroupById(id);
    setGroup(data.payload);
    setIsLoading(false);
  }

  useEffect(() => {
    if (locationState) {
      getGroup(locationState.groupId);
    } else {
      navigate("/ShowGroups");
    }
  }, [locationState, navigate]);

  return (
    <div className="addNewGroup" style={{ scale: ".8" }}>
      <Loader open={isLoading} />
      <div className="title">
        <h1 className="Heading">Edit {group.groupname} Group</h1>
        <p className="card-description">
          Fields marked with <span className="text-danger">*</span> are required
        </p>
      </div>
      <div className="body border border-secondary rounded">
        <OurStepper
          steps={steps} // stepper steps
          Outlet={<Outlet context={{ group, getGroup }} />}
          pathNames={pathNames}
          onlyBack={true}
        />
      </div>
    </div>
  );
}

export default EditGroups;
