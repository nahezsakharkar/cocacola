import React from "react";
import AddGroup from "../../../components/Groups/AddNewGroup/AddGroup/AddGroup";
import "../../../custom/css/custom.css";

function AddNewGroup() {
  return (
    <div className="addNewGroup">
      <div className="title">
        <h1 className="Heading">Add New Group</h1>
        <p className="card-description">
          Fields marked with <span className="text-danger">*</span> are required
        </p>
      </div>
      <div className="body">
        <AddGroup />
      </div>
    </div>
  );
}

export default AddNewGroup;
