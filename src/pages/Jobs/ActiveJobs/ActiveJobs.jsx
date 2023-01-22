import { useState, useEffect } from "react";
import DataTable from "../../../components/Common/DataTable/DataTable";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import schedule from "../../../services/scheduleService";
import "../../../custom/css/custom.css";

function ActiveJobs() {
  const [activeJobsList, setActiveJobsList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  async function getActiveJobs() {
    const data = await schedule.getActiveJobsQueries();
    setActiveJobsList(data.payload);
    setIsLoading(false);
  }

  useEffect(() => {
    getActiveJobs();
  }, []);

  const refresh = () => {
    setIsLoading(true);
    getActiveJobs();
  };

  const columns = [
    {
      field: "groupname",
      headerName: "Job Group",
      //  flex: 2,
      width: 200,
    },
    {
      field: "sid",
      headerName: "Step",
      // flex: 1.5,
      width: 80,
    },
    {
      field: "interfacename",
      headerName: "Interface",
      // flex: 1.5,
      width: 150,
    },
    {
      field: "jobid",
      headerName: "Job Id",
      // flex: 1.5,
      width: 300,
    },
    {
      field: "companyid",
      headerName: "Company Id",
      // flex: 0.4,
      width: 150,
    },
    {
      field: "startat",
      headerName: "Started",
      // flex: 1.3,
      width: 150,
    },
    {
      field: "jobstatus",
      headerName: "Status",
      // flex: 1.3,
      width: 130,
    },
    {
      field: "duration",
      headerName: "Duration",
      // flex: 1.5,
      width: 150,
      valueGetter: (params) => {
        const date1 = new Date(params.row.startat);
        const date2 = new Date(params.row.completedat);
        const diffInMs = Math.abs(date2 - date1) / (1000 * 60);
        // const diffInSs = diffInMs / 1000;
        return diffInMs <= 1 ? diffInMs + " Minute" : diffInMs + " Minutes";
      },
    },
    {
      field: "remarks",
      headerName: "Logs",
      // flex: 1.5,
      width: 250,
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
