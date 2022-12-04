import DataTable from "../../../components/Common/DataTable/DataTable";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import "../../../custom/css/custom.css";

function ActiveJobs() {
  const columns = [
    { field: "jobGroup", headerName: "Job Group", width: 200 },
    {
      field: "step",
      headerName: "Step",
      width: 150,
      editable: true,
    },
    {
      field: "interface",
      headerName: "Interface",
      width: 150,
      editable: true,
    },
    {
      field: "jobNumber",
      headerName: "Job Number",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "started",
      headerName: "Started",
      //   description: "This column has a value getter and is not sortable.",
      //   sortable: false,
        width: 130,
      //   valueGetter: (params) =>
      //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      editable: true,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 150,
      editable: true,
    },
    {
      field: "logs",
      headerName: "Logs",
      width: 150,
      editable: true,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <div className="data activeJobs">
      <div className="title">
        <h1 className="Heading">Active Jobs</h1>
        <button type="button" className="btn btn-outline-warning btn-icon-text">
          <i className="mdi mdi-reload btn-icon-prepend"></i>
          Refresh
        </button>
      </div>
      <div className="body">
        <Stack sx={{ width: "100%", color: "#f02632" }} spacing={2}>
          <LinearProgress color="inherit" />
        </Stack>
        <DataTable columns={columns} rows={rows} />
      </div>
    </div>
  );
}

export default ActiveJobs;
