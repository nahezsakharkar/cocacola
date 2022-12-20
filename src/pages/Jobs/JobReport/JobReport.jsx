import { useState, useEffect } from "react";
import DataTable from "../../../components/Common/DataTable/DataTable";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
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
    const data = await schedule.getGroupsByRunningStatus(queryParams);
    setJobReportList(data.payload);
    setIsLoading(false);
  }

  async function getInterfaces() {
    const data = await schedule.getAllInterfaces();
    setInterfaces(data.payload);
  }

  // Stopped,Terminated,Running
  useEffect(() => {
    getInterfaces()
    getJobReport("Stopped,Terminated");
  }, []);

  const optionsForInterfaces  = interfaces.map(function (item) {
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
      field: "ended",
      headerName: "Ended",
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
