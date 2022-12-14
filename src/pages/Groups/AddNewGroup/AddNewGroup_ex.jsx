import { useEffect, useState } from "react";
import auth from "../../../services/authService";
import AddGroup from "../../../components/Groups/AddNewGroup/AddGroup/AddGroup";
import "../../../custom/css/custom.css";

function AddNewGroup() {
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
        <AddGroup admin={admin} />
      </div>
      {/* <div className="createBtn">
        <button type="button" className="btn btn-dark btn-icon-text">
          Create Group <i className="mdi mdi-group menu-icon"></i>
        </button>
      </div> */} 
    </div>
  );
}

export default AddNewGroup;
