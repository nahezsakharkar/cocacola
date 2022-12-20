import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { TextField } from "@mui/material";
import Select from "react-select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import auth from "../../../../services/authService";
import schedule from "../../../../services/scheduleService";
import OurModal from "../../../../components/Common/OurModal/OurModal";
import Loader from "../../../../components/Common/Loader/Loader";
import constants from "../../../../custom/constants/constants";

function AddGroup() {
  const navigate = useNavigate();
  const location = useLocation();

  const { groupId } = location.state;

  const [group, setGroup] = useState({});
  const [admin, setAdmin] = useState({});
  const [steps, setSteps] = useState([]);
  const [values, setValues] = useState({
    groupname: "",
    scheduledstatus: "",
    scheduled: "",
    startdate: "",
    frequency: "",
    frequencytype: "",
  });
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

  async function getAdmin() {
    const data = await auth.getCurrentUserDetails();
    setAdmin(data.payload);
  }

  async function getGroup(groupId) {
    const data = await schedule.getGroupById(groupId);
    setGroup(data.payload);
  }

  async function getSteps(id) {
    const data = await schedule.getAllSteps(id);
    setSteps(data);
  }

  useEffect(() => {
    if (groupId) {
      getGroup(groupId);
    } else {
      navigate("/ShowGroups");
    }
    
    getAdmin();
    if (Object.keys(errors).length === 0 && canSubmit) {
      handleOpen();
    }
  }, [canSubmit, errors, groupId, navigate]);

  console.log(group)

  const capitalize = (str) =>
    str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());

  function convertFullDateToNormalDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

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
  };

  const validate = (values) => {
    const errors = {};

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
    } else if (convertFullDateToNormalDate(values.startdate).length !== 10) {
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
      companyid: admin["companyid"],
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
    getSteps(data.payload.id);
    navigate("/AddNewGroup/AddStep", { state: { group: data.payload } });
  }

  return (
    <div className="card-body">
      <Loader open={isLoading} />
      <form>
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
                  styles={constants.reactSelectStyles(errors.scheduledstatus)}
                  inputId="scheduledstatus"
                  options={optionsForStatus}
                  onChange={handleChange}
                  className="search-options"
                  placeholder="Active, Disabled..."
                  // defaultValue={{
                  //   target: JSON.parse('{"id":"scheduledstatus", "value":""}'),
                  //   value: "",
                  //   label: "Active, Disabled...",
                  // }}
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
                  styles={constants.reactSelectStyles(errors.scheduled)}
                  inputId="scheduled"
                  options={optionsForSchedule}
                  onChange={handleChange}
                  className="search-options"
                  placeholder="Recurring, Once..."
                  // defaultValue={{
                  //   target: JSON.parse('{"id":"scheduled", "value":""}'),
                  //   value: "",
                  //   label: "Recurring, Once...",
                  // }}
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
                  <DatePicker
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
                  styles={constants.reactSelectStyles(errors.frequencytype)}
                  inputId="frequencytype"
                  options={optionsForFrequencyType}
                  onChange={handleChange}
                  className="search-options"
                  placeholder="Min, Hour, Day..."
                  // defaultValue={{
                  //   target: JSON.parse('{"id":"frequencytype", "value":""}'),
                  //   value: "",
                  //   label: "Min, Hour, Day...",
                  // }}
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
                <button
                  type="button"
                  className="btn btn-warning btn-icon-text btn-md"
                >
                  Test Run
                  <i className="fa fa-flash btn-icon-append"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ justifyContent: "center" }}>
          {steps.type === "S" || (
            <button
              type="button"
              onClick={onSubmit}
              className="btn btn-dark btn-icon-text"
            >
              Update Group
              <i className="fa fa-plus btn-icon-append"></i>
            </button>
          )}
        </div>
        <OurModal
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleYes={handleSubmit}
          title={"Edit Schedule?"}
          description="Do you really wish to Edit this Schedule and proceed to Editing Steps? "
        />
      </form>
    </div>
  );
}

export default AddGroup;
