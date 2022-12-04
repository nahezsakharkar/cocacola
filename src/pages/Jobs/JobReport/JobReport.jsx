import DataTable from "../../../components/Common/DataTable/DataTable";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import "../../../custom/css/custom.css";

function JobReport() {
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
      width: 140,
      editable: true,
    },
    {
      field: "jobNumber",
      headerName: "Job No.",
      width: 110,
      editable: true,
    },
    {
      field: "started",
      headerName: "Started",
      width: 100,
    },
    {
      field: "ended",
      headerName: "Ended",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      editable: true,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 130,
      editable: true,
    },
    {
      field: "logs",
      headerName: "Logs",
      width: 130,
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
    <div className="data jobReport">
      <div className="title">
        <h1 className="Heading">Job Report</h1>
        <div className="row mt-2 p-4">
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Date from</label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control"
                  placeholder="dd/mm/yyyy"
                />
              </div>
              <label className="col-sm-1 col-form-label">to</label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control"
                  placeholder="dd/mm/yyyy"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Job Group</label>
              <div className="col-sm-9">
                <select className="form-control">
                  <option>Select Job Group</option>
                  <option>Job Group 1</option>
                  <option>Job Group 2</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Interface</label>
              <div className="col-sm-9">
                <select className="form-control">
                  <option>Select Interface</option>
                  <option>Interface 1</option>
                  <option>Interface 2</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Status</label>
              <div className="col-sm-9">
                <select className="form-control">
                  <option>Select Status</option>
                  <option>Active</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-2">
              <button type="button" class="btn btn-dark btn-rounded btn-fw ml-5">
                Go!
              </button>
          </div>
        </div>
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

export default JobReport;
