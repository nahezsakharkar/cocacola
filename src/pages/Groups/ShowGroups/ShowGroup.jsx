import { useNavigate } from "react-router-dom";
import DataTable from "../../../components/Common/DataTable/DataTable";
import "../../../custom/css/custom.css";

function ShowGroup() {
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "Id", width: 80 },
    { field: "jobGroup", headerName: "Job Group", width: 270, editable: true },
    {
      field: "schedule",
      headerName: "Schedule",
      width: 210,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 500,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button type="button" class="btn btn-dark btn-icon-text btn-sm">
              Edit
              <i class="mdi mdi-file-check btn-icon-append"></i>
            </button>
            <button
              type="button"
              class="btn btn-secondary btn-icon-text btn-sm"
            >
              Disable
              <i class="fa fa-ban btn-icon-append"></i>
            </button>
            <button type="button" class="btn btn-warning btn-icon-text btn-sm">
              Run
              <i class="fa fa-flash btn-icon-append"></i>
            </button>
            <button type="button" class="btn btn-danger btn-icon-text btn-sm">
              Delete
              <i class="ti-trash btn-icon-append"></i>
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
        <DataTable columns={columns} rows={rows} />
      </div>
    </div>
  );
}

export default ShowGroup;
