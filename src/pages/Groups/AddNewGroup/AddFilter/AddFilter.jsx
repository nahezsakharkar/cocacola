import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select from "react-select";
import EmptyModal from "../../../../components/Common/EmptyModal/EmptyModal";
import OurModal from "../../../../components/Common/OurModal/OurModal";
import Filters from "../../../../components/Groups/AddNewGroup/AddFilter/Filters";
import schedule from "../../../../services/scheduleService";
import constants from "../../../../custom/constants/constants";

function AddFilter() {
  const location = useLocation();
  const { step, group } = location.state;

  const [filters, setFilters] = useState({});
  const filter_form = useRef(null);

  const defaultValues = {
    field: "",
    operator: "",
    filtervalue: "",
  };

  const [selectValue, setSelectValue] = useState({
    target: JSON.parse('{"id":"operator", "value":""}'),
    value: "",
    label: "Select Operator...",
  });

  const [radioButtonValue, setRadioButtonValue] = useState("text");

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

  async function getFilters(stepId) {
    const data = await schedule.getAllFilters(stepId);
    setFilters(data.payload);
  }

  useEffect(() => {
    getFilters(step.id);
    if (Object.keys(errors).length === 0 && canSubmit) {
      handleOpen();
    }
  }, [canSubmit, errors, step]);

  const handleRadioButtonChange = (e) => {
    setRadioButtonValue(e.target.value);
  };

  const optionsForOperator = [
    {
      target: JSON.parse('{"id":"operator", "value":"EQUALS"}'),
      value: "EQUALS",
      label: "EQUALS",
    },
    {
      target: JSON.parse('{"id":"operator", "value":"LIKE"}'),
      value: "LIKE",
      label: "LIKE",
    },
    {
      target: JSON.parse('{"id":"operator", "value":"LESS THAN"}'),
      value: "LESS THAN",
      label: "LESS THAN",
    },
    {
      target: JSON.parse('{"id":"operator", "value":"LESS THAN EQUALS TO"}'),
      value: "LESS THAN EQUALS TO",
      label: "LESS THAN EQUALS TO",
    },
    {
      target: JSON.parse('{"id":"operator", "value":"GREATER THAN"}'),
      value: "GREATER THAN",
      label: "GREATER THAN",
    },
    {
      target: JSON.parse('{"id":"operator", "value":"GREATER THAN EQUALS TO"}'),
      value: "GREATER THAN EQUALS TO",
      label: "GREATER THAN EQUALS TO",
    },
  ];

  function convertFullDateToNormalDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const dateHandleChange = (newValue) => {
    setCanSubmit(false);
    setDateValue(newValue);
    values["filtervalue"] = convertFullDateToNormalDate(newValue);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues({
      ...values,
      [id]: value,
    });
    if (e.target.id === "operator") {
      setSelectValue({ id: id, value: value, label: e.label });
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.field) {
      errors.field = "Field is Required!";
    }

    if (!values.operator) {
      errors.operator = "Operator is Required!";
    }

    if (!values.filtervalue) {
      errors.filtervalue = "Value is Required!";
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
    const data = await schedule.createFilter({ ...values, sid: step.id });
    if (data.message === "updated successfully") {
      toast.success("Filter was Updated Successfully");
      setIsLoading(false);
    } else if (data.message === "added successfully") {
      toast.success("Filter was Created Successfully");
      setIsLoading(false);
    } else {
      toast.error("There was some Error while creating a Filter");
      setIsLoading(false);
    }
    getFilters(step.id);
    filter_form.current.reset();
    setValues(defaultValues);
    setDateValue(null);
    setSelectValue({
      target: JSON.parse('{"id":"operator", "value":""}'),
      value: "",
      label: "Select Operator...",
    });
  };

  return (
    <div className="card-body border border-secondary rounded mb-3">
      <h4 className="card-title">
        Adding Filters into Step {step.sequence} of Group '{group.groupname}'
      </h4>
      <form ref={filter_form} onSubmit={(e) => e.preventDefault()}>
        <div className="filterForm">
          <div className="filterField">
            <div className="label">
              <label className="col-sm-3 col-form-label">Field</label>
            </div>
            <div className="input">
              <TextField
                error={errors.field ? true : false}
                id="field"
                placeholder="Enter Field"
                onChange={handleChange}
                helperText={errors.field}
                variant="outlined"
              />
            </div>
          </div>
          <div className="filterField">
            <div className="label">
              <label className="col-sm-3 col-form-label">Operator</label>
            </div>
            <div className="input">
              <Select
                styles={constants.reactSelectStyles(
                  errors.operator,
                  selectValue.value
                )}
                inputId="operator"
                options={optionsForOperator}
                value={selectValue}
                onChange={handleChange}
                className="search-options"
                placeholder="Select Operator..."
                defaultValue={{
                  target: JSON.parse('{"id":"operator", "value":""}'),
                  value: "",
                  label: "Select Operator...",
                }}
              />
              {errors.operator && (
                <p className="helperText">{errors.operator}</p>
              )}
            </div>
          </div>
          <div className="filterField">
            <div className="label" style={{ display: "flex" }}>
              <label className="col-sm-3 col-form-label">Value</label>
              <RadioGroup
                row
                defaultValue="text"
                name="radio-buttons-group"
                onChange={handleRadioButtonChange}
              >
                <FormControlLabel
                  sx={{ margin: "0" }}
                  value="text"
                  control={<Radio />}
                  label="Text"
                />
                <FormControlLabel
                  sx={{ margin: "0" }}
                  value="date"
                  control={<Radio />}
                  label="Date"
                />
              </RadioGroup>
            </div>
            <div className="input">
              {radioButtonValue === "text" && (
                <TextField
                  error={errors.filtervalue ? true : false}
                  id="filtervalue"
                  placeholder="Enter Field Value"
                  onChange={handleChange}
                  helperText={errors.filtervalue}
                  variant="outlined"
                />
              )}
              {radioButtonValue === "date" && (
                <div>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      inputId="filtervalue"
                      className="date-picker"
                      value={dateValue}
                      onChange={dateHandleChange}
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
              )}
            </div>
          </div>
          <div className="filterField m-auto">
            <div className="label">
              <label className="col-sm-3 col-form-label">Actions</label>
            </div>
            <div className="input">
              <button
                onClick={onSubmit}
                type="button"
                className="btn btn-dark btn-icon-text"
              >
                Add
                <i className="fa fa-plus btn-icon-append"></i>
              </button>
              <EmptyModal open={isLoading} />
              <OurModal
                open={open}
                setOpen={setOpen}
                handleOpen={handleOpen}
                handleClose={handleClose}
                handleYes={handleSubmit}
                title={"Create Filter?"}
                description="Do you really wish to Create a Filter? "
              />
            </div>
          </div>
        </div>
      </form>
      <Filters
        step={step}
        filters={filters}
        getFilters={getFilters}
        isLoading={isLoading}
      />
    </div>
  );
}

export default AddFilter;
