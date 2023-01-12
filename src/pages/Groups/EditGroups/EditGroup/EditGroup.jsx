import { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

import { TextField } from "@mui/material";
import Select from "react-select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Tooltip from "@mui/material/Tooltip";

// import auth from "../../../../services/authService";
import schedule from "../../../../services/scheduleService";
import OurModal from "../../../../components/Common/OurModal/OurModal";
import Loader from "../../../../components/Common/Loader/Loader";
import constants from "../../../../custom/constants/constants";

function EditGroup() {
  // const [admin, setAdmin] = useState({});

  const [isEditable, setIsEditable] = useState(false);

  const { group, getGroup } = useOutletContext();

  const defaultValues = {
    groupname: group.groupname || "",
    scheduledstatus: group.scheduledstatus || "",
    scheduled: group.scheduled || "",
    startdate: group.startdate || "",
    frequency: group.frequency || "",
    frequencytype: group.frequencytype || "",
    testmode: group.testmode || 0,
  };

  // react-select default values

  const scheduledStatusDefault = {
    target: JSON.parse(
      `{"id":"scheduledstatus", "value": "${group.scheduledstatus || ""}" }`
    ),
    value: group.scheduledstatus,
    label: group.scheduledstatus,
  };

  const scheduledDefault = {
    target: JSON.parse(
      `{"id":"scheduled", "value": "${group.scheduled || ""}" }`
    ),
    value: group.scheduled,
    label: group.scheduled,
  };

  const frequencyTypeDefault = {
    target: JSON.parse(
      `{"id":"frequencytype", "value": "${group.frequencytype || ""}" }`
    ),
    value: group.frequencytype,
    label: group.frequencytype,
  };

  const [selectScheduledStatus, setSelectScheduledStatus] = useState(
    scheduledStatusDefault
  );

  const [selectScheduled, setSelectScheduled] = useState(scheduledDefault);

  const [selectFrequencyStatus, setSelectFrequencyType] =
    useState(frequencyTypeDefault);

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

  const [isLoading, setIsLoading] = useState(false);

  // async function getAdmin() {
  //   const data = await auth.getCurrentUserDetails();
  //   setAdmin(data.payload);
  // }

  useEffect(() => {
    // ------------- setting default values -------------
    if (isEditable === false) {
      setValues({
        groupname: group.groupname || "",
        scheduledstatus: group.scheduledstatus || "",
        scheduled: group.scheduled || "",
        startdate: group.startdate || "",
        frequency: group.frequency || "",
        frequencytype: group.frequencytype || "",
        testmode: group.testmode || "",
      });
      setSelectScheduledStatus({
        target: JSON.parse(
          `{"id":"scheduledstatus", "value": "${group.scheduledstatus || ""}" }`
        ),
        value: group.scheduledstatus,
        label: group.scheduledstatus,
      });
      setSelectScheduled({
        target: JSON.parse(
          `{"id":"scheduled", "value": "${group.scheduled || ""}" }`
        ),
        value: group.scheduled,
        label: group.scheduled,
      });
      setSelectFrequencyType({
        target: JSON.parse(
          `{"id":"frequencytype", "value": "${group.frequencytype || ""}" }`
        ),
        value: group.frequencytype,
        label: group.frequencytype,
      });
      setDateValue(new Date(group.startdate));
      setCheckBoxValue(group.testmode === 1 ? true : false);
    }
    // ------------- setting default values -------------
    // getAdmin();
    if (Object.keys(errors).length === 0 && canSubmit) {
      handleOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canSubmit, errors, group]);

  // check if objects are equal
  const areObjectsEqual = (...objects) =>
    objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));

  const group_form = useRef(null);
  const reset = () => {
    setSelectScheduledStatus(scheduledStatusDefault);
    setSelectScheduled(scheduledDefault);
    setSelectFrequencyType(frequencyTypeDefault);
    setDateValue(new Date(group.startdate));
    setCheckBoxValue(group.testmode === 1 ? true : false);
    setValues(defaultValues);
  };

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

    if (e.target.id === "testmode") {
      setValues({
        ...values,
        [id]:
          isEditable === false
            ? checkBoxValue === true
              ? 1
              : 0
            : checkBoxValue === false
            ? 1
            : 0,
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
      ...group,
      ...values,
      frequency: Number(values.frequency),
      groupname: capitalize(values.groupname),
    });
    getGroup(group.id);
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
    setIsEditable(false);
    setCanSubmit(false);
  }

  return (
    <div className="card-body">
      <Loader open={isLoading} />
      <form className="myForms" ref={group_form}>
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
                  value={values.groupname}
                  onChange={handleChange}
                  helperText={errors.groupname}
                  variant="outlined"
                  InputProps={{
                    readOnly: !isEditable,
                  }}
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
                  isSearchable={isEditable}
                  menuIsOpen={!isEditable ? false : undefined}
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
                  isSearchable={isEditable}
                  menuIsOpen={!isEditable ? false : undefined}
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
                    readOnly={!isEditable}
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
                  value={values.frequency}
                  onChange={handleChange}
                  inputProps={{
                    type: "number",
                    min: 0,
                  }}
                  helperText={errors.frequency}
                  variant="outlined"
                  InputProps={{
                    readOnly: !isEditable,
                  }}
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
                  isSearchable={isEditable}
                  menuIsOpen={!isEditable ? false : undefined}
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
                    onClick={(e) => {
                      if (isEditable === false) {
                        e.preventDefault();
                      } else {
                        setCheckBoxValue(!checkBoxValue);
                        setValues({
                          ...values,
                          testmode: checkBoxValue === false ? 1 : 0,
                        });
                      }
                    }}
                  >
                    <input
                      id="testmode"
                      onChange={handleChange}
                      style={{ zoom: 1.3, accentColor: "#f02632" }}
                      type="checkbox"
                      className="form-check-input"
                      checked={checkBoxValue}
                      onClick={(e) => (!isEditable ? e.preventDefault() : "")}
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
          {isEditable ? (
            <>
              <button
                type="button"
                onClick={onSubmit}
                className="btn btn-dark btn-icon-text"
                disabled={areObjectsEqual(defaultValues, values) ? true : false}
              >
                Save Changes
                <i className="fa fa-cloud-upload btn-icon-append"></i>
              </button>
              <Tooltip
                title="Clear All Data from the Form."
                placement="bottom"
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
              <button
                type="button"
                onClick={() => setIsEditable(false)}
                className="btn btn-dark btn-icon-text"
              >
                <i className="ti-close btn-icon-prepend"></i>
                Cancel Edit
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditable(true)}
              className="btn btn-dark btn-icon-text"
            >
              Edit Group
              <i className="fa fa-edit btn-icon-append"></i>
            </button>
          )}
        </div>
        <OurModal
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleYes={handleSubmit}
          title={"Update Schedule?"}
          description="Do you really wish to Update this Schedule? "
        />
      </form>
    </div>
  );
}

export default EditGroup;
