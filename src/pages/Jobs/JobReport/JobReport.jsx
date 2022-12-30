import { useState, useEffect } from "react";
import DataTable from "../../../components/Common/DataTable/DataTable";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select from "react-select";
import schedule from "../../../services/scheduleService";
import constants from "../../../custom/constants/constants";
import "../../../custom/css/custom.css";

function JobReport() {
  const [JobReportList, setJobReportList] = useState([]);

  const defaultValues = {
    startdate: "",
    enddate: "",
    groupname: "",
    interface: "",
    status: "",
  };

  const [selectInterfaceValue, setSelectInterfaceValue] = useState({
    target: JSON.parse('{"id":"interface", "value":""}'),
    value: "",
    label: "Select Interface...",
  });

  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);

  const [interfaces, setInterfaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getJobReport(queryParams) {
    const data = await schedule.getJoblogReportsQueries(queryParams);
    setJobReportList(data.payload);
    setIsLoading(false);
  }

  async function getInterfaces() {
    const data = await schedule.getAllInterfaces();
    setInterfaces(data.payload);
  }

  // function getInterfaces() {
  //   setInterfaces(JobReportList.filter((item) => {
  //     return {
  //       id: item.iid,
  //       interfacename: item.interfacename,
  //     };
  //   }));
  // }

  async function getJobReportAll() {
    const data = await schedule.getJoblogReportsAll();
    setJobReportList(data.payload);
    setIsLoading(false);
  }

  // start_date, end_date, gid, iid, job_status
  useEffect(() => {
    getInterfaces();
    getJobReportAll();
  }, []);

  const optionsForInterfaces = interfaces.map(function (item) {
    return {
      target: JSON.parse(`{"id":"iid", "value":"${item.id}"}`),
      value: item.id,
      label: item.name,
    };
  });

  const handleChange = (e) => {
    setCanSubmit(false);
    const { id, value } = e.target;
    setValues({
      ...values,
      [id]: value,
    });

    if (e.target.id === "iid") {
      setSelectInterfaceValue({ id: id, value: value, label: e.label });
    }

    // if (e.target.id === "synctype") {
    //   setSelectSyncTypeValue({ id: id, value: value, label: e.label });
    // }
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
      field: "startat",
      headerName: "Started",
      // flex: 1.3,
      width: 150,
    },
    {
      field: "completedat",
      headerName: "Ended",
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
        const diffInSs = diffInMs / 1000;
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

  const rows = JobReportList;

  return (
    <div className="data jobReport">
      <div className="title">
        <h1 className="Heading">Job Report</h1>
        <div className="row mt-2 p-4">
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Date from</label>
              <div className="col-sm-4">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputId="filtervalue"
                    className="date-picker"
                    // value={dateValue}
                    // onChange={dateHandleChange}
                    renderInput={(params) => (
                      <TextField
                        name="filtervalue"
                        sx={{
                          height: "3rem",
                          width: "100%",
                          border: "none",
                          "&>.MuiInputBase-root": {
                            position: "static",
                            border: errors.filtervalue && "1px solid #d32f2f",
                          },
                          "&>.MuiInputBase-root:hover": {
                            border: errors.filtervalue && "1px solid #d32f2f",
                          },
                        }}
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
                {errors.filtervalue && (
                  <p className="helperText">{errors.filtervalue}</p>
                )}
              </div>
              <label className="col-sm-1 col-form-label">to</label>
              <div className="col-sm-4">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputId="filtervalue"
                    className="date-picker"
                    // value={dateValue}
                    // onChange={dateHandleChange}
                    renderInput={(params) => (
                      <TextField
                        name="filtervalue"
                        sx={{
                          height: "3rem",
                          width: "100%",
                          border: "none",
                          "&>.MuiInputBase-root": {
                            position: "static",
                            border: errors.filtervalue && "1px solid #d32f2f",
                          },
                          "&>.MuiInputBase-root:hover": {
                            border: errors.filtervalue && "1px solid #d32f2f",
                          },
                        }}
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
                {errors.filtervalue && (
                  <p className="helperText">{errors.filtervalue}</p>
                )}
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
                <Select
                  styles={constants.reactSelectStyles(
                    errors.interface,
                    selectInterfaceValue.value
                  )}
                  inputId="interface"
                  options={optionsForInterfaces}
                  value={selectInterfaceValue}
                  onChange={handleChange}
                  className="search-options"
                  placeholder="Select Sync Type..."
                  defaultValue={{
                    target: JSON.parse('{"id":"interface", "value":""}'),
                    value: "",
                    label: "Select Interface...",
                  }}
                />
                {errors.interface && (
                  <p className="helperText">{errors.interface}</p>
                )}
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
            <button
              type="button"
              className="btn btn-dark btn-rounded btn-fw ml-5"
            >
              Go!
            </button>
          </div>
        </div>
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

export default JobReport;
