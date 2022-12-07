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
      <div className="body border border-secondary rounded">
        <AddGroup />
      </div>
      <div className="createBtn">
        <button type="button" class="btn btn-dark btn-icon-text">
          Create Group <i class="mdi mdi-group menu-icon"></i>
        </button>
      </div>
    </div>
  );
}

export default AddNewGroup;
