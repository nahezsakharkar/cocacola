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
    startat: "",
    completedat: "",
    gid: "",
    iid: "",
    jobstatus: "",
    jobid: "",
  };

  const jobGroupDefault = {
    target: JSON.parse('{"id":"gid", "value":""}'),
    value: "",
    label: "Select Job Group...",
  };

  const [selectJobGroupValue, setSelectJobGroupValue] =
    useState(jobGroupDefault);

  const interfaceDefault = {
    target: JSON.parse('{"id":"interface", "value":""}'),
    value: "",
    label: "Select Interface...",
  };

  const [selectInterfaceValue, setSelectInterfaceValue] =
    useState(interfaceDefault);

  const jobStatusDefault = {
    target: JSON.parse('{"id":"jobstatus", "value":""}'),
    value: "",
    label: "Select Job Status...",
  };

  const [selectJobStatusValue, setSelectJobStatusValue] =
    useState(jobStatusDefault);

  const [filterQueryParams, setFilterQueryParams] = useState(defaultValues);
  const [dateValue1, setDateValue1] = useState(null);
  const [dateValue2, setDateValue2] = useState(null);
  // const [errors, setErrors] = useState({});
  // const [canSubmit, setCanSubmit] = useState(false);

  const [interfaces, setInterfaces] = useState([]);
  const [jobGroups, setJobGroups] = useState([]);
  const [jobStatus, setJobStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getJobReport(queryParams) {
    const data = await schedule.getJoblogReportsQueries(queryParams);
    setJobReportList(data.payload);
    setIsLoading(false);
  }

  async function getJobReportAll() {
    const data = await schedule.getJoblogReportsAll();
    setJobReportList(data.payload);
    setIsLoading(false);
    // interfaces from existing reports
    setInterfaces(
      data.payload.map((item) => {
        return {
          id: item.iid,
          name: item.interfacename,
        };
      })
    );
    // groups from existing reports
    setJobGroups(
      data.payload.map((item) => {
        return {
          id: item.gid,
          name: item.groupname,
        };
      })
    );
    // status from existing reports
    setJobStatus(
      data.payload.map((item) => {
        return {
          jobstatus: item.jobstatus,
        };
      })
    );
  }

  // start_date, end_date, gid, iid, job_status
  useEffect(() => {
    getJobReportAll();
  }, []);

  const optionsForInterfaces = interfaces.map(function (item) {
    return {
      target: JSON.parse(`{"id":"iid", "value":"${item.id}"}`),
      value: item.id,
      label: item.name,
    };
  });

  const filteredOptionsForInterfaces = optionsForInterfaces.filter(
    ({ value }, index) =>
      !optionsForInterfaces.map((o) => o.value).includes(value, index + 1)
  );

  const optionsForJobGroups = jobGroups.map(function (item) {
    return {
      target: JSON.parse(`{"id":"gid", "value":"${item.id}"}`),
      value: item.id,
      label: item.name,
    };
  });

  const filteredOptionsForJobGroups = optionsForJobGroups.filter(
    ({ value }, index) =>
      !optionsForJobGroups.map((o) => o.value).includes(value, index + 1)
  );

  const optionsForJobStatus = jobStatus.map(function (item) {
    return {
      target: JSON.parse(`{"id":"jobstatus", "value":"${item.jobstatus}"}`),
      value: item.jobstatus,
      label: item.jobstatus,
    };
  });

  const filteredOptionsForJobStatus = optionsForJobStatus.filter(
    ({ value }, index) =>
      !optionsForJobStatus.map((o) => o.value).includes(value, index + 1)
  );

  function convertFullDateToNormalDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const dateHandleChange1 = (newValue) => {
    // setCanSubmit(false);
    setDateValue1(newValue);
    filterQueryParams["startat"] = convertFullDateToNormalDate(newValue);
  };

  const dateHandleChange2 = (newValue) => {
    // setCanSubmit(false);
    setDateValue2(newValue);
    filterQueryParams["completedat"] = convertFullDateToNormalDate(newValue);
  };

  const handleChange = (e) => {
    // setCanSubmit(false);
    const { id, value } = e.target;
    setFilterQueryParams({
      ...filterQueryParams,
      [id]: value,
    });

    if (e.target.id === "iid") {
      setSelectInterfaceValue({ id: id, value: value, label: e.label });
    }

    if (e.target.id === "gid") {
      setSelectJobGroupValue({ id: id, value: value, label: e.label });
    }

    if (e.target.id === "jobstatus") {
      setSelectJobStatusValue({ id: id, value: value, label: e.label });
    }
  };

  const handleSubmit = () => {
    // setCanSubmit(true);
    setIsLoading(true);
    getJobReport(filterQueryParams);
  };

  const reset = () => {
    setSelectJobGroupValue(jobGroupDefault);
    setSelectInterfaceValue(interfaceDefault);
    setSelectJobStatusValue(jobStatusDefault);
    setDateValue1(null);
    setDateValue2(null);
    setFilterQueryParams(defaultValues);
    setIsLoading(true);
    getJobReportAll();
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

  const rows = JobReportList;

  return (
    <div className="data jobReport">
      <div className="title">
        <h1 className="Heading">Job Report</h1>
        <form className="myForms">
          <div className="row mt-2 p-4">
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Date from</label>
                <div className="col-sm-4">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      inputId="startat"
                      className="date-picker"
                      value={dateValue1}
                      onChange={dateHandleChange1}
                      renderInput={(params) => (
                        <TextField
                          name="startat"
                          sx={{
                            height: "3rem",
                            width: "100%",
                            border: "none",
                            // "&>.MuiInputBase-root": {
                            //   position: "static",
                            //   border: errors.startat && "1px solid #d32f2f",
                            // },
                            // "&>.MuiInputBase-root:hover": {
                            //   border: errors.startat && "1px solid #d32f2f",
                            // },
                          }}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  {/* {errors.startat && (
                  <p className="helperText">{errors.startat}</p>
                )} */}
                </div>
                <label className="col-sm-1 col-form-label">to</label>
                <div className="col-sm-4">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      inputId="completedat"
                      className="date-picker"
                      value={dateValue2}
                      onChange={dateHandleChange2}
                      renderInput={(params) => (
                        <TextField
                          name="completedat"
                          sx={{
                            height: "3rem",
                            width: "100%",
                            border: "none",
                            // "&>.MuiInputBase-root": {
                            //   position: "static",
                            //   border: errors.completedat && "1px solid #d32f2f",
                            // },
                            // "&>.MuiInputBase-root:hover": {
                            //   border: errors.completedat && "1px solid #d32f2f",
                            // },
                          }}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  {/* {errors.completedat && (
                  <p className="helperText">{errors.completedat}</p>
                )} */}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Job Group</label>
                <div className="col-sm-9">
                  <Select
                    styles={constants.reactSelectStyles(
                      // errors.gid,
                      false,
                      selectJobGroupValue.value
                    )}
                    inputId="gid"
                    options={filteredOptionsForJobGroups}
                    value={selectJobGroupValue}
                    onChange={handleChange}
                    className="search-options"
                    placeholder="Select Job Group..."
                    defaultValue={jobGroupDefault}
                  />
                  {/* {errors.gid && <p className="helperText">{errors.gid}</p>} */}
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Interface</label>
                <div className="col-sm-9">
                  <Select
                    styles={constants.reactSelectStyles(
                      // errors.iid,
                      false,
                      selectInterfaceValue.value
                    )}
                    inputId="iid"
                    options={filteredOptionsForInterfaces}
                    value={selectInterfaceValue}
                    onChange={handleChange}
                    className="search-options"
                    placeholder="Select Interface..."
                    defaultValue={interfaceDefault}
                  />
                  {/* {errors.iid && <p className="helperText">{errors.iid}</p>} */}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Status</label>
                <div className="col-sm-9">
                  <Select
                    styles={constants.reactSelectStyles(
                      // errors.jobstatus,
                      false,
                      selectJobStatusValue.value
                    )}
                    inputId="jobstatus"
                    options={filteredOptionsForJobStatus}
                    value={selectJobStatusValue}
                    onChange={handleChange}
                    className="search-options"
                    placeholder="Select Job Status..."
                    defaultValue={jobStatusDefault}
                  />
                  {/* {errors.jobstatus && (
                  <p className="helperText">{errors.jobstatus}</p>
                )} */}
                </div>
              </div>
            </div>
            <div
              className="col-md-3"
              style={{ display: "flex", height: "fit-content", gap: "1rem" }}
            >
              <button
                type="button"
                className="btn btn-dark btn-rounded btn-fw ml-5"
                onClick={handleSubmit}
              >
                Go!
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-rounded btn-fw"
                onClick={reset}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
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
