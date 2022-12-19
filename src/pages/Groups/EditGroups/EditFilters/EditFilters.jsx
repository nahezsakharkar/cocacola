import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import Select from "react-select";
import EmptyModal from "../../../../components/Common/EmptyModal/EmptyModal";
import OurModal from "../../../../components/Common/OurModal/OurModal";
import Filters from "../../../../components/Groups/AddNewGroup/AddFilter/Filters";
import schedule from "../../../../services/scheduleService";
import constants from "../../../../custom/constants/constants";

function AddFilter() {
  const location = useLocation();
  // const { step, group } = location.state;

  const [filters, setFilters] = useState({ id: "default" });
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

  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setCanSubmit(false);
    setOpen(false);
  };

  const [isLoading, setIsLoading] = useState(false);

  async function getFilters(groupId) {
    const data = await schedule.getAllFilters(groupId);
    setFilters(data.payload);
  }

  // useEffect(() => {
  //   getFilters(step.id);
  //   if (Object.keys(errors).length === 0 && canSubmit) {
  //     handleOpen();
  //   }
  // }, [canSubmit, errors, step]);

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
  ];

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

  // const handleSubmit = async () => {
  //   setOpen(false);
  //   setCanSubmit(false);
  //   setIsLoading(true);
  //   const data = await schedule.createFilter({ ...values, sid: step.id });
  //   if (data.message === "updated successfully") {
  //     toast.success("Filter was Updated Successfully");
  //     setIsLoading(false);
  //   } else if (data.message === "added successfully") {
  //     toast.success("Filter was Created Successfully");
  //     setIsLoading(false);
  //   } else {
  //     toast.error("There was some Error while creating a Filter");
  //     setIsLoading(false);
  //   }
  //   getFilters(step.id);
  //   filter_form.current.reset();
  //   setValues(defaultValues);
  //   setSelectValue({
  //     target: JSON.parse('{"id":"operator", "value":""}'),
  //     value: "",
  //     label: "Select Operator...",
  //   });
  // };

  return (
    <div className="card-body border border-secondary rounded mb-3">
      <h4 className="card-title">
        {/* Adding Filters into Step {step.sequence} of Group '{group.groupname}' */}
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
            <div className="label">
              <label className="col-sm-3 col-form-label">Value</label>
            </div>
            <div className="input">
              <TextField
                error={errors.filtervalue ? true : false}
                id="filtervalue"
                placeholder="Enter Field Value"
                onChange={handleChange}
                helperText={errors.filtervalue}
                variant="outlined"
              />
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
                // handleYes={handleSubmit}
                title={"Create Filter?"}
                description="Do you really wish to Create a Filter? "
              />
            </div>
          </div>
        </div>
      </form>
      <Filters filters={filters} isLoading={isLoading} />
    </div>
  );
}

export default AddFilter;
