import { useState, useEffect } from "react";
import DataTable from "../../../components/Common/DataTable/DataTable";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import schedule from "../../../services/scheduleService";
import "../../../custom/css/custom.css";

function ActiveJobs() {
  const [activeJobsList, setActiveJobsList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  async function getActiveJobs(queryParams) {
    const data = await schedule.getGroupsByRunningStatus(queryParams);
    setActiveJobsList(data.payload);
    setIsLoading(false);
  }

  // Stopped,Terminated,Running
  useEffect(() => {
    getActiveJobs("Running");
  }, []);

  const refresh = () => {
    setIsLoading(true);
    getActiveJobs("Running");
  };

  const columns = [
    { field: "groupname", headerName: "Job Group", flex: 2, width: 200 },
    {
      field: "step",
      headerName: "Step",
      flex: 1.5,
      width: 150,
    },
    {
      field: "interface",
      headerName: "Interface",
      flex: 1.5,
      width: 150,
    },
    {
      field: "jobNumber",
      headerName: "Job Number",
      flex: 1.5,
      type: "number",
      width: 150,
    },
    {
      field: "started",
      headerName: "Started",
      flex: 1.3,
      width: 130,
    },
    {
      field: "scheduledstatus",
      headerName: "Status",
      flex: 1.3,
      width: 130,
    },
    {
      field: "duration",
      headerName: "Duration",
      flex: 1.5,
      width: 150,
    },
    {
      field: "logs",
      headerName: "Logs",
      flex: 1.5,
      width: 150,
    },
  ];

  const rows = activeJobsList;

  return (
    <div className="data activeJobs">
      <div className="title">
        <h1 className="Heading">Active Jobs</h1>
        <button
          type="button"
          className="btn btn-outline-warning btn-icon-text"
          onClick={refresh}
        >
          <i className="mdi mdi-reload btn-icon-prepend"></i>
          Refresh
        </button>
      </div>
      <div className="body">
        {isLoading && (
          <Stack sx={{ width: "100%", color: "#f02632" }} spacing={2}>
            <LinearProgress color="inherit" />
          </Stack>
        )}
        <DataTable columns={columns} rows={rows} toolbar />
      </div>
    </div>
  );
}

export default ActiveJobs;
