import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { TextField } from "@mui/material";
import Select from "react-select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import Tooltip from "@mui/material/Tooltip";

import auth from "../../../../services/authService";
import schedule from "../../../../services/scheduleService";
import OurModal from "../../../../components/Common/OurModal/OurModal";
import Loader from "../../../../components/Common/Loader/Loader";
import constants from "../../../../custom/constants/constants";

function AddGroup() {
  const [admin, setAdmin] = useState({});
  const [companyId, setCompanyId] = useState([]);

  const defaultValues = {
    groupname: "",
    scheduledstatus: "",
    scheduled: "",
    startdate: "",
    frequency: "",
    frequencytype: "",
    testmode: 0,
  };

  // react-select default values

  const scheduledStatusDefault = {
    target: JSON.parse('{"id":"scheduledstatus", "value":""}'),
    value: "",
    label: "Active, Disabled...",
  };

  const scheduledDefault = {
    target: JSON.parse('{"id":"scheduled", "value":""}'),
    value: "",
    label: "Recurring, Once...",
  };

  const frequencyTypeDefault = {
    target: JSON.parse('{"id":"frequencytype", "value":""}'),
    value: "",
    label: "Min, Hour, Day...",
  };

  const [selectScheduledStatus, setSelectScheduledStatus] = useState(
    scheduledStatusDefault
  );

  const [selectScheduled, setSelectScheduled] = useState(scheduledDefault);

  const [selectFrequencyStatus, setSelectFrequencyType] =
    useState(frequencyTypeDefault);

  const [selectCountryCodeValue, setSelectCountryCodeValue] = useState({
    target: JSON.parse('{"id":"companyid", "value":""}'),
    value: "",
    label: "Select Country Code...",
  });

  const [values, setValues] = useState(defaultValues);
  const [dateValue, setDateValue] = useState(null);
  const [checkBoxValue, setCheckBoxValue] = useState(false);
  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setCanSubmit(false);
    setOpen(false);
  };

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function getAdmin() {
    const data = await auth.getCurrentUserDetails();
    setAdmin(data.payload);
  }

  useEffect(() => {
    getAdmin();
    setCompanyId(admin.companyid ? admin.companyid.split(",") : []);
    if (Object.keys(errors).length === 0 && canSubmit) {
      handleOpen();
    }
  }, [admin.companyid, canSubmit, errors]);

  const group_form = useRef(null);
  const reset = () => {
    group_form.current.reset();
    setSelectScheduledStatus(scheduledStatusDefault);
    setSelectScheduled(scheduledDefault);
    setSelectFrequencyType(frequencyTypeDefault);
    setSelectCountryCodeValue({
      target: JSON.parse('{"id":"companyid", "value":""}'),
      value: "",
      label: "Select Country Code...",
    });
    setDateValue(null);
    setCheckBoxValue(false);
    setValues(defaultValues);
  };

  const capitalize = (str) =>
    str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());

  function convertFullDateToNormalDate(str) {
    let date = new Date(str);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let justDate = [date.getFullYear(), month, day].join("-");
    let justTime = [hour, minutes].join(":");
    return justDate + " " + justTime;
  }

  const convertToArrayOfObjects = (arr) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push({
        id: arr[i],
        country:
          arr[i] === "1428"
            ? "SriLanka"
            : arr[i] === "1429"
            ? "Nepal A"
            : arr[i] === "1430"
            ? "Nepal B"
            : "Bangladesh",
      });
    }
    return newArr;
  };

  const optionsForCompanyId = convertToArrayOfObjects(companyId).map(function (
    item
  ) {
    return {
      target: JSON.parse(`{"id":"companyid", "value":"${item.id}"}`),
      value: item.id,
      label: item.country + " (" + item.id + ") ",
    };
  });

  const optionsForStatus = [
    {
      target: JSON.parse('{"id":"scheduledstatus", "value":"Active"}'),
      value: "Active",
      label: "Active",
    },
    {
      target: JSON.parse('{"id":"scheduledstatus", "value":"Disabled"}'),
      value: "Disabled",
      label: "Disabled",
    },
  ];

  const optionsForSchedule = [
    {
      target: JSON.parse('{"id":"scheduled", "value":"Recurring"}'),
      value: "Recurring",
      label: "Recurring",
    },
    {
      target: JSON.parse('{"id":"scheduled", "value":"Once"}'),
      value: "Once",
      label: "Once",
    },
  ];

  const optionsForFrequencyType = [
    {
      target: JSON.parse('{"id":"frequencytype", "value":"Min"}'),
      value: "Min",
      label: "Min",
    },
    {
      target: JSON.parse('{"id":"frequencytype", "value":"Hour"}'),
      value: "Hour",
      label: "Hour",
    },
    {
      target: JSON.parse('{"id":"frequencytype", "value":"Day"}'),
      value: "Day",
      label: "Day",
    },
  ];

  const dateHandleChange = (newValue) => {
    setCanSubmit(false);
    setDateValue(newValue);
    values["startdate"] = convertFullDateToNormalDate(newValue);
  };

  const handleChange = (e) => {
    setCanSubmit(false);
    const { id, value } = e.target;
    setValues({
      ...values,
      [id]: value,
    });

    if (e.target.id === "testmode") {
      setValues({
        ...values,
        [id]: e.target.checked === true ? 1 : 0,
      });
    }

    if (e.target.id === "scheduledstatus") {
      setSelectScheduledStatus({ id: id, value: value, label: e.label });
    }

    if (e.target.id === "scheduled") {
      setSelectScheduled({ id: id, value: value, label: e.label });
    }

    if (e.target.id === "frequencytype") {
      setSelectFrequencyType({ id: id, value: value, label: e.label });
    }

    if (e.target.id === "companyid") {
      setSelectCountryCodeValue({ id: id, value: value, label: e.label });
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.companyid) {
      errors.companyid = "Company Id is Required!";
    }

    if (!values.groupname) {
      errors.groupname = "Group Name is Required!";
    }

    if (!values.scheduledstatus) {
      errors.scheduledstatus = "Status is Required!";
    }

    if (!values.scheduled) {
      errors.scheduled = "Schedule is Required!";
    }

    if (values.startdate === "") {
      errors.startdate = "Start Date is Required!";
    } else if (convertFullDateToNormalDate(values.startdate).length !== 16) {
      errors.startdate = "Invalid Date!";
    }

    if (values.frequency === "") {
      errors.frequency = "Frequency is Required!";
    }

    if (!values.frequencytype) {
      errors.frequencytype = "Frequency Type is Required!";
    }

    return errors;
  };

  const onSubmit = () => {
    setErrors(validate(values));
    setCanSubmit(true);
  };

  async function handleSubmit() {
    setIsLoading(true);
    const data = await schedule.createGroup({
      ...values,
      frequency: Number(values.frequency),
      groupname: capitalize(values.groupname),
      testmode: checkBoxValue ? 1 : 0,
      // companyid: admin["companyid"],
      userid: admin["id"],
    });
    if (data.message === "updated successfully") {
      setIsLoading(false);
      toast.success("Schedule was Updated Successfully");
    } else if (data.message === "added successfully") {
      setIsLoading(false);
      toast.success("Schedule was Created Successfully");
    } else {
      setIsLoading(false);
      toast.error("There was some Error while creating a Schedule");
    }
    setOpen(false);
    reset();
    navigate("/AddNewGroup/AddStep", { state: { group: data.payload } });
  }

  return (
    <div className="card-body">
      <Loader open={isLoading} />
      <form className="myForms" ref={group_form}>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">
                Company Code<span className="text-danger">*</span>
              </label>
              <div className="col-sm-9">
                <Select
                  styles={constants.reactSelectStyles(
                    errors.companyid,
                    selectCountryCodeValue.value
                  )}
                  inputId="companyid"
                  options={optionsForCompanyId}
                  value={selectCountryCodeValue}
                  onChange={handleChange}
                  className="search-options"
                  placeholder="Select Company Code.."
                  defaultValue={{
                    target: JSON.parse('{"id":"companyid", "value":""}'),
                    value: "",
                    label: "Select Company Code...",
                  }}
                />
                {errors.companyid && (
                  <p className="helperText">{errors.companyid}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group row">
              <label htmlFor="groupname" className="col-sm-3 col-form-label">
                Job Group Name<span className="text-danger">*</span>
              </label>
              <div className="col-sm-9">
                <TextField
                  error={errors.groupname ? true : false}
                  id="groupname"
                  className="capitalize"
                  placeholder="Enter Job Group Name"
                  onChange={handleChange}
                  helperText={errors.groupname}
                  variant="outlined"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row">
              <label
                htmlFor="scheduledstatus"
                className="col-sm-3 col-form-label"
              >
                Status <span className="text-danger">*</span>
              </label>
              <div className="col-sm-9">
                <Select
                  styles={constants.reactSelectStyles(
                    errors.scheduledstatus,
                    selectScheduledStatus.value
                  )}
                  inputId="scheduledstatus"
                  options={optionsForStatus}
                  value={selectScheduledStatus}
                  onChange={handleChange}
                  className="search-options"
                  placeholder="Active, Disabled..."
                  defaultValue={scheduledStatusDefault}
                />
                {errors.scheduledstatus && (
                  <p className="helperText">{errors.scheduledstatus}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group row">
              <label htmlFor="scheduled" className="col-sm-3 col-form-label">
                Schedule<span className="text-danger">*</span>
              </label>
              <div className="col-sm-9">
                <Select
                  styles={constants.reactSelectStyles(
                    errors.scheduled,
                    selectScheduled.value
                  )}
                  inputId="scheduled"
                  options={optionsForSchedule}
                  value={selectScheduled}
                  onChange={handleChange}
                  className="search-options"
                  placeholder="Recurring, Once..."
                  defaultValue={scheduledDefault}
                />
                {errors.scheduled && (
                  <p className="helperText">{errors.scheduled}</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row">
              <label htmlFor="startdate" className="col-sm-3 col-form-label">
                Start Date<span className="text-danger">*</span>
              </label>
              <div className="col-sm-9">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    inputId="startdate"
                    className="date-picker"
                    value={dateValue}
                    onChange={dateHandleChange}
                    renderInput={(params) => (
                      <TextField
                        name="startdate"
                        sx={{
                          height: "3rem",
                          width: "100%",
                          border: "none",
                          "&>.MuiInputBase-root": {
                            position: "static",
                            border: errors.startdate && "1px solid #d32f2f",
                          },
                          "&>.MuiInputBase-root:hover": {
                            border: errors.startdate && "1px solid #d32f2f",
                          },
                        }}
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
                {errors.startdate && (
                  <p className="helperText">{errors.startdate}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group row">
              <label htmlFor="frequency" className="col-sm-3 col-form-label">
                Frequency<span className="text-danger">*</span>
              </label>
              <div className="col-sm-9">
                <TextField
                  error={errors.frequency ? true : false}
                  id="frequency"
                  placeholder="Enter Frequency"
                  onChange={handleChange}
                  inputProps={{
                    type: "number",
                    min: 0,
                  }}
                  helperText={errors.frequency}
                  variant="outlined"
                />
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group row">
              <label
                htmlFor="frequencytype"
                className="col-sm-5 col-form-label"
              >
                Frequency Type<span className="text-danger">*</span>
              </label>
              <div className="col-sm-7">
                <Select
                  styles={constants.reactSelectStyles(
                    errors.frequencytype,
                    selectFrequencyStatus.value
                  )}
                  inputId="frequencytype"
                  options={optionsForFrequencyType}
                  value={selectFrequencyStatus}
                  onChange={handleChange}
                  className="search-options"
                  placeholder="Min, Hour, Day..."
                  defaultValue={frequencyTypeDefault}
                />
                {errors.frequencytype && (
                  <p className="helperText">{errors.frequencytype}</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group row">
              <div className="mx-auto">
                <Tooltip
                  title="When checked the data is not sent to destination but makes data log files Locally."
                  placement="bottom"
                  arrow
                >
                  <div
                    className="runTest"
                    onClick={() => setCheckBoxValue(!checkBoxValue)}
                  >
                    <input
                      id="testmode"
                      onChange={handleChange}
                      style={{ zoom: 1.3 }}
                      type="checkbox"
                      className="form-check-input"
                      checked={checkBoxValue}
                    />
                    <div className="checkBoxWithIcon">
                      <span>Test Run</span>
                      <i className="fa fa-flash btn-icon-append"></i>
                    </div>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ justifyContent: "center", gap: "2rem" }}>
          <button
            type="button"
            onClick={onSubmit}
            className="btn btn-dark btn-icon-text"
          >
            Create Group and Proceed to Adding Steps
            <i className="fa fa-plus btn-icon-append"></i>
          </button>
          <Tooltip
            title="Clear All Data from the Form."
            placement="right"
            arrow
          >
            <button
              type="button"
              onClick={reset}
              className="btn btn-secondary btn-icon-text"
            >
              Reset
            </button>
          </Tooltip>
        </div>
        <OurModal
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleYes={handleSubmit}
          title={"Create Schedule?"}
          description="Do you really wish to Create a Schedule and proceed to adding Steps? "
        />
      </form>
    </div>
  );
}

export default AddGroup;
