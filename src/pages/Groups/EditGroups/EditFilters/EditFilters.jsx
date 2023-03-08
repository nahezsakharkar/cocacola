import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
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

function EditFilters() {
  const location = useLocation();
  const navigate = useNavigate();
  if (!location.state) {
    navigate("/ShowGroups");
  }
  const { step } = location.state;

  const { group, getGroup } = useOutletContext();

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

  // edit states

  const [filter, setFilter] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const defaultValuesEdit = {
    field: filter.field || "",
    operator: filter.operator || "",
    filtervalue: filter.filtervalue || "",
  };

  const [selectValueEdit, setSelectValueEdit] = useState({
    target: JSON.parse('{"id":"operator", "value":""}'),
    value: "",
    label: "Select Operator...",
  });

  const [radioButtonValueEdit, setRadioButtonValueEdit] = useState("text");

  const [valuesEdit, setValuesEdit] = useState(defaultValuesEdit);
  const [dateValueEdit, setDateValueEdit] = useState(null);
  const [errorsEdit, setErrorsEdit] = useState({});
  const [filterDataSaveChangesClicked, setFilterDataSaveChangesClicked] =
    useState(false);
  const [canSubmitEdit, setCanSubmitEdit] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setCanSubmit(false);
    setOpen(false);
  };

  const [operation, setOperation] = useState("");
  const [modalTitle, setModalTitle] = useState();
  const [modalDesc, setModalDesc] = useState();

  const [isLoading, setIsLoading] = useState(false);

  async function getFilters(stepId) {
    const data = await schedule.getAllFilters(stepId);
    setFilters(data.payload);
  }

  const openModal = (thisOperation) => {
    setOperation(thisOperation);
    if (thisOperation === "create") {
      setModalTitle("Create Filter?");
      setModalDesc("Do you really wish to Create this Filter?");
      handleOpen();
    }
    if (thisOperation === "update") {
      setModalTitle("Update Filter?");
      setModalDesc("Do you really wish to Update this Filter?");
      handleOpen();
    }
  };

  const handleOperation = () => {
    if (operation === "create") {
      handleSubmit();
    } else if (operation === "update") {
      handleSubmitEdit();
    }
  };

  useEffect(() => {
    getFilters(step.id);

    // for edit  ----------------
    if (filterDataSaveChangesClicked === false) {
      setValuesEdit({
        field: filter.field || "",
        operator: filter.operator || "",
        filtervalue: filter.filtervalue || "",
      });

      setSelectValueEdit({
        target: JSON.parse(
          `{"id":"operator", "value": "${filter.operator || ""}" }`
        ),
        value: filter.operator,
        label: filter.operator,
      });
      setRadioButtonValueEdit(
        new Date(filter.filtervalue).getDate() &&
          isNaN(Number(filter.filtervalue))
          ? "date"
          : "text"
      );
      setDateValueEdit(
        (isNaN(new Date(filter.filtervalue).getDate()) ? "text" : "date") ===
          "date"
          ? new Date(filter.filtervalue)
          : null
      );
    }
    // --------------------------

    if (Object.keys(errors).length === 0 && canSubmit) {
      openModal("create");
    }

    if (Object.keys(errorsEdit).length === 0 && canSubmitEdit) {
      openModal("update");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    canSubmit,
    canSubmitEdit,
    errors,
    errorsEdit,
    filter,
    filterDataSaveChangesClicked,
    step,
  ]);

  // console.log(radioButtonValueEdit);

  const handleRadioButtonChange = (e) => {
    setRadioButtonValue(e.target.value);
  };

  const optionsForOperator = [
    {
      target: JSON.parse('{"id":"operator", "value":"EQUALS"}'),
      value: "EQUALS",
      label: "=",
    },
    {
      target: JSON.parse('{"id":"operator", "value":"LIKE"}'),
      value: "LIKE",
      label: "LIKE",
    },
    {
      target: JSON.parse('{"id":"operator", "value":"LESS THAN"}'),
      value: "LESS THAN",
      label: "<",
    },
    {
      target: JSON.parse('{"id":"operator", "value":"LESS THAN EQUALS TO"}'),
      value: "LESS THAN EQUALS TO",
      label: "<=",
    },
    {
      target: JSON.parse('{"id":"operator", "value":"GREATER THAN"}'),
      value: "GREATER THAN",
      label: ">",
    },
    {
      target: JSON.parse('{"id":"operator", "value":"GREATER THAN EQUALS TO"}'),
      value: "GREATER THAN EQUALS TO",
      label: ">=",
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

  // edit functions

  // check if objects are equal
  const areObjectsEqual = (...objects) =>
    objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));

  const handleRadioButtonChangeEdit = (e) => {
    setRadioButtonValueEdit(e.target.value);
  };

  const dateHandleChangeEdit = (newValue) => {
    setCanSubmitEdit(false);
    setDateValueEdit(newValue);
    valuesEdit["filtervalue"] = convertFullDateToNormalDate(newValue);
  };

  const handleEdit = (row) => {
    setFilter(row);
  };

  const handleChangeEdit = (e) => {
    const { id, value } = e.target;
    setValuesEdit({
      ...valuesEdit,
      [id]: value,
    });
    if (e.target.id === "operator") {
      setSelectValueEdit({ id: id, value: value, label: e.label });
    }
  };

  const validateEdit = (values) => {
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

  const onSubmitEdit = () => {
    setErrorsEdit(validateEdit(valuesEdit));
    setFilterDataSaveChangesClicked(true);
    setCanSubmitEdit(true);
  };

  const handleSubmitEdit = async () => {
    setOpen(false);
    setCanSubmitEdit(false);
    setIsLoading(true);
    const data = await schedule.createFilter({
      id: filter.id,
      sid: filter.sid,
      ...valuesEdit,
    });
    setIsEditing(false);
    setIsEditable(false);
    setFilterDataSaveChangesClicked(false);
    getGroup(group.id);
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
    setValuesEdit(defaultValuesEdit);
    setDateValueEdit(null);
    setSelectValueEdit({
      target: JSON.parse('{"id":"operator", "value":""}'),
      value: "",
      label: "Select Operator...",
    });
  };

  return (
    <div className="card-body border border-secondary rounded mt-3 mb-3">
      <h4 className="card-title">
        {isEditing ? "Updating" : "Adding"} Filters into Step {step.sequence} of
        Group '{group.groupname}'
      </h4>
      {/* form */}
      {isEditing ? (
        // update form
        <>
          {" "}
          <form
            className="myForms"
            ref={filter_form}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="filterForm">
              <div className="filterField" style={{ width: "22%" }}>
                <div className="label">
                  <label className="col-sm-3 col-form-label">Field</label>
                </div>
                <div className="input">
                  <TextField
                    error={errorsEdit.field ? true : false}
                    id="field"
                    placeholder="Enter Field"
                    value={valuesEdit.field}
                    onChange={handleChangeEdit}
                    helperText={errorsEdit.field}
                    variant="outlined"
                    InputProps={{
                      readOnly: !isEditable,
                    }}
                  />
                </div>
              </div>
              <div className="filterField" style={{ width: "21%" }}>
                <div className="label">
                  <label className="col-sm-3 col-form-label">Operator</label>
                </div>
                <div className="input">
                  <Select
                    styles={constants.reactSelectStyles(
                      errorsEdit.operator,
                      selectValueEdit.value
                    )}
                    inputId="operator"
                    options={optionsForOperator}
                    value={selectValueEdit}
                    onChange={handleChangeEdit}
                    className="search-options"
                    placeholder="Select Operator..."
                    isSearchable={isEditable}
                    menuIsOpen={!isEditable ? false : undefined}
                  />
                  {errorsEdit.operator && (
                    <p className="helperText">{errorsEdit.operator}</p>
                  )}
                </div>
              </div>
              <div className="filterField" style={{ width: "22%" }}>
                <div className="label" style={{ display: "flex" }}>
                  <label className="col-sm-3 col-form-label">Value</label>
                  <RadioGroup
                    row
                    value={radioButtonValueEdit}
                    name="radio-buttons-group-edit"
                    onChange={handleRadioButtonChangeEdit}
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
                  {radioButtonValueEdit === "text" && (
                    <TextField
                      error={errorsEdit.filtervalue ? true : false}
                      id="filtervalue"
                      placeholder="Enter Field Value"
                      value={
                        radioButtonValueEdit === "text"
                          ? valuesEdit.filtervalue
                          : ""
                      }
                      onChange={handleChangeEdit}
                      helperText={errorsEdit.filtervalue}
                      variant="outlined"
                      InputProps={{
                        readOnly: !isEditable,
                      }}
                    />
                  )}
                  {radioButtonValueEdit === "date" && (
                    <div>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          inputId="filtervalue"
                          className="date-picker"
                          value={dateValueEdit}
                          onChange={dateHandleChangeEdit}
                          renderInput={(params) => (
                            <TextField
                              name="filtervalue"
                              sx={{
                                height: "3rem",
                                width: "100%",
                                border: "none",
                                "&>.MuiInputBase-root": {
                                  position: "static",
                                  border:
                                    errorsEdit.filtervalue &&
                                    "1px solid #d32f2f",
                                },
                                "&>.MuiInputBase-root:hover": {
                                  border:
                                    errorsEdit.filtervalue &&
                                    "1px solid #d32f2f",
                                },
                              }}
                              {...params}
                            />
                          )}
                          readOnly={!isEditable}
                        />
                      </LocalizationProvider>
                      {errorsEdit.filtervalue && (
                        <p className="helperText">{errorsEdit.filtervalue}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="filterField m-auto" style={{ width: "26%" }}>
                <div className="label">
                  <label className="col-sm-3 col-form-label">Actions</label>
                </div>
                <div
                  className="input"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "-4px",
                  }}
                >
                  {isEditable ? (
                    <>
                      <button
                        type="button"
                        onClick={onSubmitEdit}
                        className="btn btn-dark btn-icon-text"
                        style={{ scale: ".8" }}
                        disabled={
                          areObjectsEqual(defaultValuesEdit, valuesEdit)
                            ? true
                            : false
                        }
                      >
                        Save Changes
                        <i className="fa fa-cloud-upload btn-icon-append"></i>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setIsEditable(false);
                          setFilterDataSaveChangesClicked(false);
                          setErrors({});
                          setErrorsEdit({});
                          setCanSubmit(false);
                          setCanSubmitEdit(false);
                        }}
                        className="btn btn-dark btn-icon-text"
                        style={{ scale: ".8" }}
                      >
                        <i className="ti-close btn-icon-prepend"></i>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsEditable(true)}
                        className="btn btn-dark btn-icon-text"
                        style={{ scale: ".8" }}
                      >
                        Edit Filter
                        <i className="fa fa-edit btn-icon-append"></i>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setIsEditable(false);
                          setFilterDataSaveChangesClicked(false);
                          setErrors({});
                          setErrorsEdit({});
                          setCanSubmit(false);
                          setCanSubmitEdit(false);
                        }}
                        className="btn btn-dark btn-icon-text"
                        style={{ scale: ".8" }}
                      >
                        <i className="ti-close btn-icon-prepend"></i>
                        Cancel Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        <>
          <form
            className="myForms"
            ref={filter_form}
            onSubmit={(e) => e.preventDefault()}
          >
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
                    value={radioButtonValue}
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
                                  border:
                                    errors.filtervalue && "1px solid #d32f2f",
                                },
                                "&>.MuiInputBase-root:hover": {
                                  border:
                                    errors.filtervalue && "1px solid #d32f2f",
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
                <div className="input" style={{ marginTop: "-4px" }}>
                  <button
                    onClick={onSubmit}
                    type="button"
                    className="btn btn-dark btn-icon-text"
                    style={{ scale: ".8" }}
                  >
                    Add
                    <i className="fa fa-plus btn-icon-append"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}

      <EmptyModal open={isLoading} />
      <OurModal
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleYes={handleOperation}
        title={modalTitle}
        description={modalDesc}
      />
      <Filters
        editable={location.pathname === "/ShowGroups/EditGroups/EditFilters"}
        step={step}
        filters={filters}
        getFilters={getFilters}
        isLoading={isLoading}
        setIsEditing={setIsEditing}
        handleEdit={handleEdit}
      />
    </div>
  );
}

export default EditFilters;
