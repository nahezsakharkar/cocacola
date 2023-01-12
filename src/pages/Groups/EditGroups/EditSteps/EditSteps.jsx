import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
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

function EditSteps() {
  const location = useLocation();
  const navigate = useNavigate();

  // var { group } = location.state;
  const { group, getGroup } = useOutletContext();

  const [interfaces, setInterfaces] = useState([]);
  const [steps, setSteps] = useState([]);
  const [sequence, setSequence] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

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

  // edit states --------------------------------
  const [step, setStep] = useState({});

  const defaultValuesEdit = {
    iid: step.iid || "",
    synctype: step.synctype || "",
    syncdate: step.syncdate || "",
    batchsize: step.batchsize || "",
    batching: step.batching || 0,
    detailedlog: step.detailedlog || 0,
    forcesync: step.forcesync || 0,
  };

  const [selectInterfaceDefaultValueEdit, setSelectInterfaceDefaultValueEdit] =
    useState({
      target: JSON.parse(`{"id":"iid", "value": "${step.iid || ""}" }`),
      value: step.iid,
      label: step.interfacename,
    });

  const [selectSyncTypeValueEdit, setSelectSyncTypeValueEdit] = useState({
    target: JSON.parse(`{"id":"synctype", "value": "${step.synctype || ""}" }`),
    value: step.synctype,
    label: step.synctype,
  });

  const [checkBoxForceSyncValue, setCheckBoxForceSyncValue] = useState(false);
  const [checkBoxBatchValue, setCheckBoxBatchValue] = useState(false);
  const [checkBoxLogsValue, setCheckBoxLogsValue] = useState(false);

  const [valuesEdit, setValuesEdit] = useState(defaultValuesEdit);
  const [dateValueEdit, setDateValueEdit] = useState(null);
  const [errorsEdit, setErrorsEdit] = useState({});
  const [stepDataSaveChangesClicked, setStepDataSaveChangesClicked] =
    useState(false);
  const [canSubmitEdit, setCanSubmitEdit] = useState(false);

  // -------------------------------------------------

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setCanSubmit(false);
    setCanSubmitEdit(false);
    setOpen(false);
  };
  const [operation, setOperation] = useState("");
  const [modalTitle, setModalTitle] = useState();
  const [modalDesc, setModalDesc] = useState();

  const [isLoading, setIsLoading] = useState(false);

  async function getInterfaces() {
    const data = await schedule.getAllInterfaces();
    setInterfaces(data.payload);
  }
  
  // async function getStep() {
  //   const data = await schedule.getStepById(step.id);
  //   setStep(data.payload);
  // }

  const openModal = (thisOperation) => {
    setOperation(thisOperation);
    if (thisOperation === "create") {
      setModalTitle("Create Step?");
      setModalDesc("Do you really wish to Create this Step?");
      handleOpen();
    }
    if (thisOperation === "update") {
      setModalTitle("Update Step?");
      setModalDesc("Do you really wish to Update this Step?");
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
    getInterfaces();
    setSteps(group.steps);
    setSequence(group.sids);

    // for edit  ----------------
    if (stepDataSaveChangesClicked === false) {
      setValuesEdit({
        iid: step.iid || "",
        synctype: step.synctype || "",
        syncdate: step.syncdate || "",
        batchsize: step.batchsize || "",
        batching: step.batching || 0,
        detailedlog: step.detailedlog || 0,
        forcesync: step.forcesync || 0,
      });
      setSelectInterfaceDefaultValueEdit({
        target: JSON.parse(`{"id":"iid", "value": "${step.iid || ""}" }`),
        value: step.iid,
        label: step.interfacename,
      });

      setSelectSyncTypeValueEdit({
        target: JSON.parse(
          `{"id":"synctype", "value": "${step.synctype || ""}" }`
        ),
        value: step.synctype,
        label: step.synctype,
      });
      setCheckBoxForceSyncValue(
        (!step.forcesync ? 0 : step.forcesync) === 1 ? true : false
      );
      setDateValueEdit(
        (!step.syncdate ? "Na" : step.syncdate) !== "Na"
          ? new Date(step.syncdate)
          : null
      );
      setCheckBoxBatchValue(
        (!step.batching ? 0 : step.batching) === 1 ? true : false
      );
      setCheckBoxLogsValue(
        (!step.detailedlog ? 0 : step.detailedlog) === 1 ? true : false
      );
    }
    // --------------------------

    if (Object.keys(errors).length === 0 && canSubmit) {
      openModal("create");
    }

    if (Object.keys(errorsEdit).length === 0 && canSubmitEdit) {
      openModal("update");
    }
  }, [
    canSubmit,
    errors,
    group,
    canSubmitEdit,
    errorsEdit,
    step,
    stepDataSaveChangesClicked,
  ]);

  // check if objects are equal
  const areObjectsEqual = (...objects) =>
    objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));

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
      sequence: group.steps.length === 0 ? 1 : group.steps.length + 1,
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
    getGroup(group.id);
    getInterfaces();
    reset();
  };

  // edit functions

  const optionsForInterfacesEdit = [
    {
      target: JSON.parse(`{"id":"iid", "value": "${step.iid || ""}" }`),
      value: step.iid,
      label: step.interfacename,
    },
    ...interfaces.map(function (item) {
      return {
        target: JSON.parse(`{"id":"iid", "value":"${item.id}"}`),
        value: item.id,
        label: item.name,
      };
    }),
  ];

  const optionsForSyncTypeEdit = [
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

  const dateHandleChangeEdit = (newValue) => {
    setCanSubmitEdit(false);
    setDateValueEdit(newValue);
    valuesEdit["syncdate"] = convertFullDateToNormalDate(newValue);
  };

  const handleEdit = (row) => {
    setStep(row);
  };

  const resetEdit = () => {
    setSelectInterfaceDefaultValueEdit({
      target: JSON.parse(`{"id":"iid", "value": "${step.iid || ""}" }`),
      value: step.iid,
      label: step.interfacename,
    });

    setSelectSyncTypeValueEdit({
      target: JSON.parse(
        `{"id":"synctype", "value": "${step.synctype || ""}" }`
      ),
      value: step.synctype,
      label: step.synctype,
    });
    setCheckBoxForceSyncValue(
      (!step.forcesync ? 0 : step.forcesync) === 1 ? true : false
    );
    setDateValueEdit(
      (!step.syncdate ? "Na" : step.syncdate) !== "Na"
        ? new Date(step.syncdate)
        : null
    );
    setCheckBoxBatchValue(
      (!step.batching ? 0 : step.batching) === 1 ? true : false
    );
    setCheckBoxLogsValue(
      (!step.detailedlog ? 0 : step.detailedlog) === 1 ? true : false
    );

    setValuesEdit(defaultValuesEdit);
  };

  const handleChangeEdit = (e) => {
    setCanSubmitEdit(false);
    const { id, value } = e.target;
    setValuesEdit({
      ...valuesEdit,
      [id]: value,
    });

    if (e.target.id === "batching") {
      setCheckBoxBatchValue(
        isEditable ? !checkBoxBatchValue : checkBoxBatchValue
      );
      setValuesEdit({
        ...valuesEdit,
        [id]:
          isEditable === false
            ? checkBoxBatchValue === true
              ? 1
              : 0
            : checkBoxBatchValue === false
            ? 1
            : 0,
      });
    }
    if (e.target.id === "forcesync") {
      setCheckBoxForceSyncValue(
        isEditable ? !checkBoxForceSyncValue : checkBoxForceSyncValue
      );
      setValuesEdit({
        ...valuesEdit,
        [id]:
          isEditable === false
            ? checkBoxForceSyncValue === true
              ? 1
              : 0
            : checkBoxForceSyncValue === false
            ? 1
            : 0,
      });
    }
    if (e.target.id === "detailedlog") {
      setCheckBoxLogsValue(isEditable ? !checkBoxLogsValue : checkBoxLogsValue);
      setValuesEdit({
        ...valuesEdit,
        [id]:
          isEditable === false
            ? checkBoxLogsValue === true
              ? 1
              : 0
            : checkBoxLogsValue === false
            ? 1
            : 0,
      });
    }

    if (e.target.id === "iid") {
      setSelectInterfaceDefaultValueEdit({
        id: id,
        value: value,
        label: e.label,
      });
    }

    if (e.target.id === "synctype") {
      setSelectSyncTypeValueEdit({ id: id, value: value, label: e.label });
    }
  };

  const validateEdit = (values) => {
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

  const onSubmitEdit = () => {
    setErrorsEdit(validateEdit(valuesEdit));
    setStepDataSaveChangesClicked(true);
    setCanSubmitEdit(true);
  };

  const handleSubmitEdit = async () => {
    setOpen(false);
    setCanSubmitEdit(false);
    setIsLoading(true);
    const data = await schedule.createStep({
      ...valuesEdit,
      id: step.id,
      gid: group.id,
      sequence: step.sequence,
    });
    setIsEditing(false)
    setIsEditable(false)
    setStepDataSaveChangesClicked(false);
    if (data.message === "updated successfully") {
      toast.success("Step was Updated Successfully");
      setIsLoading(false);
      setValuesEdit({});
    } else if (data.message === "added successfully") {
      toast.success("Step was Created Successfully");
      setIsLoading(false);
    } else {
      toast.error("There was some Error while creating a Step");
      setIsLoading(false);
    }
    getGroup(group.id);
    getInterfaces();
    resetEdit();
  };

  return (
    <div className="card-body border border-secondary rounded mt-3 mb-3">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <h4 className="card-title">
          {isEditing ? "Updating" : "Adding"} Steps into {group.groupname} Group
        </h4>
      </div>
      {/* form */}
      {isEditing ? (
        // update form
        <>
          {false ? "update form" : ""}
          <form className="myForms" onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Interface <span className="text-danger">*</span>
                  </label>
                  <div className="col-sm-9">
                    <Select
                      styles={constants.reactSelectStyles(
                        errorsEdit.iid,
                        selectInterfaceDefaultValueEdit.value
                      )}
                      inputId="iid"
                      options={optionsForInterfacesEdit}
                      value={selectInterfaceDefaultValueEdit}
                      onChange={handleChangeEdit}
                      className="search-options"
                      placeholder="Select Interface..."
                      isSearchable={isEditable}
                      menuIsOpen={!isEditable ? false : undefined}
                    />
                    {errorsEdit.iid && (
                      <p className="helperText">{errorsEdit.iid}</p>
                    )}
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
                        errorsEdit.synctype,
                        selectSyncTypeValueEdit.value
                      )}
                      inputId="synctype"
                      options={optionsForSyncTypeEdit}
                      value={selectSyncTypeValueEdit}
                      onChange={handleChangeEdit}
                      className="search-options"
                      placeholder="Select Sync Type..."
                      isSearchable={isEditable}
                      menuIsOpen={!isEditable ? false : undefined}
                    />
                    {errorsEdit.synctype && (
                      <p className="helperText">{errorsEdit.synctype}</p>
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
                              onChange={handleChangeEdit}
                              type="checkbox"
                              className="form-check-input"
                              checked={checkBoxForceSyncValue}
                              onClick={(e) =>
                                !isEditable ? e.preventDefault() : ""
                              }
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
                            value={dateValueEdit}
                            onChange={dateHandleChangeEdit}
                            renderInput={(params) => (
                              <TextField
                                name="syncdate"
                                sx={{
                                  height: "3rem",
                                  width: "100%",
                                  border: "none",
                                  "&>.MuiInputBase-root": {
                                    position: "static",
                                    border:
                                      errorsEdit.syncdate &&
                                      "1px solid #d32f2f",
                                  },
                                  "&>.MuiInputBase-root:hover": {
                                    border:
                                      errorsEdit.syncdate &&
                                      "1px solid #d32f2f",
                                  },
                                }}
                                {...params}
                              />
                            )}
                          />
                        </LocalizationProvider>
                        {errorsEdit.syncdate && (
                          <p className="helperText">{errorsEdit.syncdate}</p>
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
                              onChange={handleChangeEdit}
                              type="checkbox"
                              className="form-check-input"
                              checked={checkBoxBatchValue}
                              onClick={(e) =>
                                !isEditable ? e.preventDefault() : ""
                              }
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
                          error={errorsEdit.batchsize ? true : false}
                          id="batchsize"
                          placeholder="Enter Batch Size"
                          value={valuesEdit.batchsize}
                          onChange={handleChangeEdit}
                          inputProps={{
                            type: "number",
                            min: 0,
                          }}
                          helperText={errorsEdit.batchsize}
                          variant="outlined"
                          InputProps={{
                            readOnly: !isEditable,
                          }}
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
                              onChange={handleChangeEdit}
                              type="checkbox"
                              className="form-check-input"
                              checked={checkBoxLogsValue}
                              onClick={(e) =>
                                !isEditable ? e.preventDefault() : ""
                              }
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
          <div
            className="row"
            style={{ justifyContent: "center", gap: "2rem" }}
          >
            {isEditable ? (
              <>
                <button
                  type="button"
                  onClick={onSubmitEdit}
                  className="btn btn-dark btn-icon-text"
                  disabled={
                    areObjectsEqual(defaultValuesEdit, valuesEdit)
                      ? true
                      : false
                  }
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
                    onClick={resetEdit}
                    className="btn btn-secondary btn-icon-text"
                  >
                    Reset
                  </button>
                </Tooltip>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setIsEditable(false);
                    setStepDataSaveChangesClicked(false);
                    setErrors({});
                    setErrorsEdit({});
                    setCanSubmit(false);
                    setCanSubmitEdit(false);
                  }}
                  className="btn btn-dark btn-icon-text"
                >
                  <i className="ti-close btn-icon-prepend"></i>
                  Cancel Edit
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditable(true)}
                  className="btn btn-dark btn-icon-text"
                >
                  Edit Step
                  <i className="fa fa-edit btn-icon-append"></i>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setIsEditable(false);
                    setStepDataSaveChangesClicked(false);
                    setErrors({});
                    setErrorsEdit({});
                    setCanSubmit(false);
                    setCanSubmitEdit(false);
                  }}
                  className="btn btn-dark btn-icon-text"
                >
                  <i className="ti-close btn-icon-prepend"></i>
                  Cancel Edit
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        // add form
        <>
          <form
            className="myForms"
            ref={step_form}
            onSubmit={(e) => e.preventDefault()}
          >
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
                                    border:
                                      errors.syncdate && "1px solid #d32f2f",
                                  },
                                  "&>.MuiInputBase-root:hover": {
                                    border:
                                      errors.syncdate && "1px solid #d32f2f",
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
                          // defaultValue={null}
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
          <div
            className="row"
            style={{ justifyContent: "center", gap: "2rem" }}
          >
            <button
              type="button"
              className="btn btn-dark btn-icon-text"
              onClick={onSubmit}
            >
              Confirm Step
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
      <OrderedSteps
        editable={location.pathname === "/ShowGroups/EditGroups/EditSteps"}
        groupInfo={group}
        getGroupInfo={getGroup}
        steps={steps}
        sequence={sequence}
        isLoading={isLoading}
        setIsEditing={setIsEditing}
        handleEdit={handleEdit}
      />
    </div>
  );
}

export default EditSteps;
