import { useState, useEffect } from "react";
import DataTable from "../../components/Common/DataTable/DataTable";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import schedule from "../../services/scheduleService";
import "../../custom/css/custom.css";

function Logs() {
  const [logsList, seLogsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getLogs() {
    const data = await schedule.getAllJobLogs();
    seLogsList(data.payload);
    setIsLoading(false);
  }

  useEffect(() => {
    getLogs();
  }, []);

  const refresh = () => {
    setIsLoading(true);
    getLogs();
  };

  const columns = [
    {
      field: "serialNo",
      headerName: "Serial No.",
      // flex: 1,
      width: 100,
      valueGetter: (params) => params.api.getRowIndex(params.row.id) + 1,
    },
    {
      field: "groupname",
      headerName: "Job Group",
      //  flex: 2,
      width: 200,
    },
    {
      field: "interfacename",
      headerName: "Interface",
      // flex: 1.5,
      width: 250,
    },
    {
      field: "jobid",
      headerName: "Job Id",
      // flex: 1.3,
      width: 300,
    },
    {
      field: "jobstatus",
      headerName: "Status",
      // flex: 1.5,
      width: 150,
    },
    {
      field: "transactionid",
      headerName: "Transaction Id",
      // flex: 1.3,
      width: 300,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      // flex: 3,
      width: 300,
    },
    {
      field: "testmode",
      headerName: "Test Mode",
      // flex: 1.1,
      width: 110,
    },
    {
      field: "batchno",
      headerName: "Batch No.",
      // flex: 1.1,
      width: 110,
    },
    {
      field: "startat",
      headerName: "Started At",
      // flex: 2,
      width: 150,
    },
    {
      field: "completedat",
      headerName: "Completed At",
      // flex: 2,
      width: 150,
    },
  ];

  const rows = logsList;

  return (
    <div className="data logs">
      <div className="title">
        <h1 className="Heading">Job Logs</h1>
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
        <DataTable pageSize={15} columns={columns} rows={rows} toolbar />
      </div>
    </div>
  );
}

export default Logs;
