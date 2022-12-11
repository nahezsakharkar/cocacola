import { useNavigate } from "react-router-dom";
import DataTable from "../../../components/Common/DataTable/DataTable";
import "../../../custom/css/custom.css";

function ShowGroup() {
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "Id", flex: .2, width: 80 },
    {
      field: "jobGroup",
      headerName: "Job Group",
      flex: .8,
      width: 270,
      editable: true,
    },
    {
      field: "schedule",
      headerName: "Schedule",
      flex: .7,
      width: 210,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      flex: .5,
      width: 150,
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

  const rows = [
    {
      id: 1,
      jobGroup: "Nepal Products",
      schedule: "Every 10 Mins",
      status: "Active",
    },
    {
      id: 2,
      jobGroup: "Nepal Distributers",
      schedule: "Daily at 9 AM",
      status: "Active",
    },
    { id: 3, jobGroup: "Nepal Outlets", schedule: null, status: "Disabled" },
    { id: 4, jobGroup: "Nepal Salesman", schedule: null, status: "Active" },
  ];

  return (
    <div className="data existingGroups">
      <div className="title">
        <h1 className="Heading">Existing Groups</h1>
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
        <DataTable columns={columns} rows={rows} toolbar />
      </div>
    </div>
  );
}

export default ShowGroup;
