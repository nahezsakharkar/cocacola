import React from "react";
import AddFilter from "../../../components/Groups/AddNewGroup/AddFilter/AddFilter";
import AddGroup from "../../../components/Groups/AddNewGroup/AddGroup/AddGroup";
import AddStep from "../../../components/Groups/AddNewGroup/AddStep/AddStep";

function AddNewGroup() {
  return (
    <>
      <AddGroup />
      <AddStep />
      <AddFilter/>
    </>
  );
}

export default AddNewGroup;
