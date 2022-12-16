import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import Select from "react-select";
import auth from "../../../../services/authService";
import schedule from "../../../../services/scheduleService";
import OurModal from "../../../../components/Common/OurModal/OurModal";

function AddGroup() {
  const [formValues, setFormValues] = useState({});
  const [admin, setAdmin] = useState({});
  const [steps, setSteps] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  async function getAdmin() {
    const data = await auth.getCurrentUserDetails();
    setAdmin(data.payload);
  }

  async function getSteps(id) {
    const data = await schedule.getAllSteps(id);
    setSteps(data);
  }

  useEffect(() => {
    getAdmin();
  }, []);

  const capitalize = (str) =>
    str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value,
      groupname: capitalize(value),
      companyid: admin["companyid"],
      userid: admin["id"],
    });
    console.log(formValues)
  };

  const onSubmit = () => {
    handleSubmit();
  };

  async function handleSubmit() {
    const data = await schedule.createGroup(formValues);
    if (data.message === "updated successfully") {
      toast.success("Schedule was Updated Successfully");
    } else if (data.message === "added successfully") {
      toast.success("Schedule was Created Successfully");
    } else {
      toast.error("There was some Error while creating a Schedule");
    }
    setOpen(false);
    getSteps(data.payload.id);
    navigate("/AddNewGroup/AddStep", { state: { group: data.payload } });
  }

  return (
    <div className="card-body">
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group row">
              <label htmlFor="groupname" className="col-sm-3 col-form-label">
                Job Group Name<span className="text-danger">*</span>
              </label>
              <div className="col-sm-9">
                <TextField
                  error={false} //{formErrors.house_name_prop ? true : false}
                  id="groupname"
                  className="capitalize"
                  placeholder="Enter Job Group Name"
                  // defaultValue={updateValues.house_name}
                  onChange={handleChange}
                  // InputProps={{
                  //   readOnly: readOnly,
                  // }}
                  helperText="Error" //{formErrors.house_name}
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
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.menuIsOpen ? "red" : "#2684FF", //{formErrors.house_name_prop ? "red" : "grey"}
                      borderWidth: state.menuIsOpen ? "2px" : "1px",
                    }),
                  }}
                  inputId="scheduledstatus"
                  options={optionsForStatus}
                  onChange={handleChange}
                  className="search-options"
                  defaultValue={{
                    target: JSON.parse('{"id":"scheduledstatus", "value":""}'),
                    value: "",
                    label: "Select Status",
                  }}
                />
                <p className="helperText">Error</p>
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
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.menuIsOpen ? "red" : "#2684FF", //{formErrors.house_name_prop ? "red" : "grey"}
                      borderWidth: state.menuIsOpen ? "2px" : "1px",
                    }),
                  }}
                  inputId="scheduled"
                  options={optionsForSchedule}
                  onChange={handleChange}
                  className="search-options"
                  defaultValue={{
                    target: JSON.parse('{"id":"scheduled", "value":""}'),
                    value: "",
                    label: "Select Schedule",
                  }}
                />
                <p className="helperText">Error</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row">
              <label htmlFor="startdate" className="col-sm-3 col-form-label">
                Start Date<span className="text-danger">*</span>
              </label>
              <div className="col-sm-9">
                <input
                  id="startdate"
                  onChange={handleChange}
                  type="date"
                  className="form-control"
                  placeholder="dd/mm/yyyy"
                />
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
                <input
                  id="frequency"
                  onChange={handleChange}
                  type="number"
                  min="0"
                  className="form-control"
                  placeholder="Enter Frequency"
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
                <select
                  id="frequencytype"
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value={""}>Select Frequency</option>
                  <option value={"Min"}>Min</option>
                  <option value={"Hour"}>Hour</option>
                  <option value={"Day"}>Day</option>
                </select>
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
              onClick={handleOpen}
              className="btn btn-dark btn-icon-text"
            >
              Create Group and Add New Step
              <i className="fa fa-plus btn-icon-append"></i>
            </button>
          )}
          {steps.type === "S" && (
            <button
              type="button"
              onClick={handleOpen}
              className="btn btn-dark btn-icon-text"
            >
              Update Steps
              <i className="fa fa-plus btn-icon-append"></i>
            </button>
          )}
        </div>
        <OurModal
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleYes={onSubmit}
          title={"Create Schedule?"}
          description="Do you really wish to Create a Schedule and proceed to adding Steps? "
        />
      </form>
    </div>
  );
}

export default AddGroup;
