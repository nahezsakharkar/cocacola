import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../components/Common/DataTable/DataTable";
import "../../../custom/css/custom.css";
import schedule from "../../../services/scheduleService";

function ShowGroup() {
  const navigate = useNavigate();
  const [groupList, setGroupList] = useState([]);

  async function getGroupsData(queryParams) {
    const data = await schedule.getGroupsByScheduleStatus(queryParams);
    setGroupList(data.payload);
  }

  useEffect(() => {
    getGroupsData("Active,Disabled");
  }, []);

  const columns = [
    { field: "id", headerName: "Id", flex: 0.2, width: 80 },
    {
      field: "groupname",
      headerName: "Job Group",
      flex: 0.8,
      // width: 270,
      editable: true,
    },
    {
      field: "scheduled",
      headerName: "Schedule",
      flex: 0.5,
      // width: 210,
      editable: true,
    },
    {
      field: "scheduledstatus",
      headerName: "Status",
      flex: 0.5,
      // width: 150,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1.5,
      width: 500,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button type="button" className="btn btn-dark btn-icon-text btn-sm">
              Edit
              <i className="mdi mdi-file-check btn-icon-append"></i>
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-icon-text btn-sm"
            >
              Disable
              <i className="fa fa-ban btn-icon-append"></i>
            </button>
            <button
              type="button"
              className="btn btn-warning btn-icon-text btn-sm"
            >
              Run
              <i className="fa fa-flash btn-icon-append"></i>
            </button>
            <button
              type="button"
              className="btn btn-danger btn-icon-text btn-sm"
            >
              Delete
              <i className="ti-trash btn-icon-append"></i>
            </button>
          </div>
        );
      },
    },
  ];

  const rows = groupList

  // const rows = [
  //   {
  //     id: 1,
  //     jobGroup: "Nepal Products",
  //     schedule: "Every 10 Mins",
  //     status: "Active",
  //   },
  //   {
  //     id: 2,
  //     jobGroup: "Nepal Distributers",
  //     schedule: "Daily at 9 AM",
  //     status: "Active",
  //   },
  //   { id: 3, jobGroup: "Nepal Outlets", schedule: null, status: "Disabled" },
  //   { id: 4, jobGroup: "Nepal Salesman", schedule: null, status: "Active" },
  // ];

  return (
    <div className="data existingGroups">
      <div className="title">
        <h1 className="Heading">Jobs Group</h1>
        <button
          onClick={() => navigate("/AddNewGroup")}
          type="button"
          className="btn btn-outline-secondary btn-icon-text"
        >
          Add New Group
          <i className="mdi mdi-file-check btn-icon-append"></i>
        </button>
      </div>
      <div className="body">
        <DataTable pageSize={15} columns={columns} rows={rows} toolbar />
      </div>
    </div>
  );
}

export default ShowGroup;
