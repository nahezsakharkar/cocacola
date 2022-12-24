import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { TextField } from "@mui/material";
import Select from "react-select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Tooltip from "@mui/material/Tooltip";

import schedule from "../../../../services/scheduleService";
import OurModal from "../../../../components/Common/OurModal/OurModal";
import OrderedSteps from "../../../../components/Groups/AddNewGroup/AddStep/OrderedSteps";
import EmptyModal from "../../../../components/Common/EmptyModal/EmptyModal";
import constants from "../../../../custom/constants/constants";

function AddStep() {
  const location = useLocation();
  const navigate = useNavigate();

  var { group } = location.state;

  const [interfaces, setInterfaces] = useState([]);
  const [steps, setSteps] = useState({});

  const step_form = useRef(null);

  const defaultValues = {
    iid: "",
    synctype: "",
    syncdate: "",
    batchsize: "",
    batching: 0,
    detailedlog: 0,
    forcesync: 0,
  };

  const [selectInterfaceValue, setSelectInterfaceValue] = useState({
    target: JSON.parse('{"id":"iid", "value":""}'),
    value: "",
    label: "Select Interface...",
  });

  const [selectSyncTypeValue, setSelectSyncTypeValue] = useState({
    target: JSON.parse('{"id":"synctype", "value":""}'),
    value: "",
    label: "Select Sync Type...",
  });

  const [values, setValues] = useState(defaultValues);
  const [dateValue, setDateValue] = useState(null);
  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setCanSubmit(false);
    setOpen(false);
  };

  const [isLoading, setIsLoading] = useState(false);

  async function getInterfaces() {
    const data = await schedule.getAllInterfaces();
    setInterfaces(data.payload);
  }

  async function getSteps(groupId) {
    const data = await schedule.getAllSteps(groupId);
    setSteps(data.payload);
  }

  useEffect(() => {
    getInterfaces();
    if (group.id) {
      getSteps(group.id);
    } else {
      navigate("/AddNewGroup/AddGroup");
    }
    if (Object.keys(errors).length === 0 && canSubmit) {
      handleOpen();
    }
  }, [canSubmit, errors, group, navigate]);

  const reset = () => {
    step_form.current.reset();
    setSelectInterfaceValue({
      target: JSON.parse('{"id":"iid", "value":""}'),
      value: "",
      label: "Select Interface...",
    });
    setSelectSyncTypeValue({
      target: JSON.parse('{"id":"synctype", "value":""}'),
      value: "",
      label: "Select Sync Type...",
    });
    setDateValue(null);
    setValues(defaultValues);
  };

  function convertFullDateToNormalDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const optionsForInterfaces = interfaces.map(function (item) {
    return {
      target: JSON.parse(`{"id":"iid", "value":"${item.id}"}`),
      value: item.id,
      label: item.name,
    };
  });

  const optionsForSyncType = [
    {
      target: JSON.parse('{"id":"synctype", "value":"Full"}'),
      value: "Full",
      label: "Full",
    },
    {
      target: JSON.parse('{"id":"synctype", "value":"Delta"}'),
      value: "Delta",
      label: "Delta",
    },
  ];

  const dateHandleChange = (newValue) => {
    setCanSubmit(false);
    setDateValue(newValue);
    values["syncdate"] = convertFullDateToNormalDate(newValue);
  };

  const handleChange = (e) => {
    setCanSubmit(false);
    const { id, value } = e.target;
    setValues({
      ...values,
      [id]: value,
    });

    if (e.target.id === "batching") {
      setValues({
        ...values,
        [id]: e.target.checked === true ? 1 : 0,
      });
    }
    if (e.target.id === "forcesync") {
      setValues({
        ...values,
        [id]: e.target.checked === true ? 1 : 0,
      });
    }
    if (e.target.id === "detailedlog") {
      setValues({
        ...values,
        [id]: e.target.checked === true ? 1 : 0,
      });
    }

    if (e.target.id === "iid") {
      setSelectInterfaceValue({ id: id, value: value, label: e.label });
    }

    if (e.target.id === "synctype") {
      setSelectSyncTypeValue({ id: id, value: value, label: e.label });
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.iid) {
      errors.iid = "Interface is Required!";
    }

    if (!values.synctype) {
      errors.synctype = "Sync Type is Required!";
    }

    if (values.forcesync === 1) {
      if (values.syncdate === "") {
        errors.syncdate = "Sync Date is Required!";
      } else if (convertFullDateToNormalDate(values.syncdate).length !== 10) {
        errors.syncdate = "Invalid Date!";
      }
    }

    if (values.batching === 1) {
      if (!values.batchsize) {
        errors.batchsize = "Batch Size is Required!";
      }
    }

    return errors;
  };

  const onSubmit = () => {
    setErrors(validate(values));
    setCanSubmit(true);
  };

  const handleSubmit = async () => {
    setOpen(false);
    setCanSubmit(false);
    setIsLoading(true);
    const data = await schedule.createStep({
      ...values,
      gid: group.id,
      sequence: steps.id === "default" ? 1 : Object.keys(steps).length + 1,
    });
    if (data.message === "updated successfully") {
      toast.success("Step was Updated Successfully");
      setIsLoading(false);
      setValues({});
    } else if (data.message === "added successfully") {
      toast.success("Step was Created Successfully");
      setIsLoading(false);
    } else {
      toast.error("There was some Error while creating a Step");
      setIsLoading(false);
    }
    getSteps(group.id);
    getInterfaces();
    reset();
  };

  return (
    <div className="card-body border border-secondary rounded mb-3">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <h4 className="card-title">
          Adding Steps into {group.groupname} Group
        </h4>
      </div>
      <form ref={step_form} onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">
                Interface <span className="text-danger">*</span>
              </label>
              <div className="col-sm-9">
                <Select
                  styles={constants.reactSelectStyles(
                    errors.iid,
                    selectInterfaceValue.value
                  )}
                  inputId="iid"
                  options={optionsForInterfaces}
                  value={selectInterfaceValue}
                  onChange={handleChange}
                  className="search-options"
                  placeholder="Select Interface..."
                  defaultValue={{
                    target: JSON.parse('{"id":"iid", "value":""}'),
                    value: "",
                    label: "Select Interface...",
                  }}
                />
                {errors.iid && <p className="helperText">{errors.iid}</p>}
              </div>
            </div>
          </div>
          {/* <div className="col-md-6">
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">
              Company Code<span className="text-danger">*</span>
            </label>
            <div className="col-sm-9">
              <select className="form-control">
                <option>Select Company Code</option>
                <option>1429</option>
                <option>1430</option>
                <option>1364</option>
                <option>1428</option>
              </select>
            </div>
          </div>
        </div> */}
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">
                Sync Type <span className="text-danger">*</span>
              </label>
              <div className="col-sm-9">
                <Select
                  styles={constants.reactSelectStyles(
                    errors.synctype,
                    selectSyncTypeValue.value
                  )}
                  inputId="synctype"
                  options={optionsForSyncType}
                  value={selectSyncTypeValue}
                  onChange={handleChange}
                  className="search-options"
                  placeholder="Select Sync Type..."
                  defaultValue={{
                    target: JSON.parse('{"id":"synctype", "value":""}'),
                    value: "",
                    label: "Select Sync Type...",
                  }}
                />
                {errors.synctype && (
                  <p className="helperText">{errors.synctype}</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row d-flex">
                  <label className="col-sm-8 col-form-label">
                    Enable Force Sync Date
                  </label>
                  <div className="col-sm-1">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          id="forcesync"
                          onChange={handleChange}
                          type="checkbox"
                          className="form-check-input"
                        />
                        <i className="input-helper"></i>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-4 col-form-label">Sync Date</label>
                  <div className="col-sm-8">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputId="syncdate"
                        className="date-picker"
                        value={dateValue}
                        onChange={dateHandleChange}
                        renderInput={(params) => (
                          <TextField
                            name="syncdate"
                            sx={{
                              height: "3rem",
                              width: "100%",
                              border: "none",
                              "&>.MuiInputBase-root": {
                                position: "static",
                                border: errors.syncdate && "1px solid #d32f2f",
                              },
                              "&>.MuiInputBase-root:hover": {
                                border: errors.syncdate && "1px solid #d32f2f",
                              },
                            }}
                            {...params}
                          />
                        )}
                      />
                    </LocalizationProvider>
                    {errors.syncdate && (
                      <p className="helperText">{errors.syncdate}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-md-3">
                <div className="form-group row d-flex">
                  <label className="col-sm-6 col-form-label">
                    Enable Batch
                  </label>
                  <div className="col-sm-2">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          id="batching"
                          onChange={handleChange}
                          type="checkbox"
                          className="form-check-input"
                        />
                        <i className="input-helper"></i>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-group row">
                  <label className="col-4 col-form-label">Batch Size</label>
                  <div className="col-sm-6">
                    <TextField
                      error={errors.batchsize ? true : false}
                      id="batchsize"
                      placeholder="Enter Batch Size"
                      onChange={handleChange}
                      inputProps={{
                        type: "number",
                        min: 0,
                      }}
                      helperText={errors.batchsize}
                      variant="outlined"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group row d-flex">
                  <label className="col-sm-6 col-form-label">
                    Enable Detailed Logs
                  </label>
                  <div className="col-sm-3">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          id="detailedlog"
                          onChange={handleChange}
                          type="checkbox"
                          className="form-check-input"
                        />
                        <i className="input-helper"></i>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="row" style={{ justifyContent: "center", gap: "2rem" }}>
        <button
          type="button"
          className="btn btn-dark btn-icon-text"
          onClick={onSubmit}
        >
          Confirm Step
          <i className="fa fa-plus btn-icon-append"></i>
        </button>
        <Tooltip title="Clear All Data from the Form." placement="right" arrow>
          <button
            type="button"
            onClick={reset}
            className="btn btn-secondary btn-icon-text"
          >
            Reset
          </button>
        </Tooltip>
      </div>
      <EmptyModal open={isLoading} />
      <OurModal
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleYes={handleSubmit}
        title={"Create Step?"}
        description="Do you really wish to Create this Step? "
      />
      <OrderedSteps group={group} steps={steps} isLoading={isLoading} />
    </div>
  );
}

export default AddStep;
