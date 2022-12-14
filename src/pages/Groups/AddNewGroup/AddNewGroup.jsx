import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import auth from "../../../services/authService";
import OurStepper from "../../../components/Common/OurStepper/OurStepper";
import "../../../custom/css/custom.css";

function AddNewGroup() {
  // Stepper Steps
  const steps = ["Create New Group", "Add Steps", "Add Filters"];
  const [admin, setAdmin] = useState({});

  async function getAdmin() {
    const data = await auth.getCurrentUserDetails();
    setAdmin(data.payload);
  }

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <div className="addNewGroup">
      <div className="title">
        <h1 className="Heading">Add New Group</h1>
        <p className="card-description">
          Fields marked with <span className="text-danger">*</span> are required
        </p>
      </div>
      <div className="body border border-secondary rounded">
        <Link to="AddGroup">Group</Link>/<Link to="AddStep">Step</Link>/
        <Link to="AddFilter">Filter</Link>
        <OurStepper
          steps={steps}
          admin={admin}
          Outlet={<Outlet />}
          onlyBack={true}
        />
      </div>
    </div>
  );
}

export default AddNewGroup;
