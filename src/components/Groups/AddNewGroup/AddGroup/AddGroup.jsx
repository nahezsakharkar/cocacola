import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import OrderedSteps from "./OrderedSteps";
import AddStep from "../AddStep/AddStep";
import schedule from "../../../../services/scheduleService";
import OurModal from "../../../Common/OurModal/OurModal";

function AddGroup(props) {
  const { admin } = props;
  const [userId, setUserId] = useState(0);
  const [companyId, setCompanyId] = useState(0);
  const [noSteps, setNoSteps] = useState(true);
  const [noOfSteps, setNoOfSteps] = useState(0);
  const [addAnotherStep, setAddAnotherStep] = useState(false);
  const [stepArray, setStepArray] = useState([]);

  const [formValues, setFormValues] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log("array : ", stepArray);
  // console.log("steps : ", noOfSteps);
  
  useEffect(() => {
    setUserId(admin["id"]);
    setCompanyId(admin["companyid"]);
  }, [admin]);

  const addStep = () => {
    setNoSteps(false);
    setNoOfSteps(noOfSteps + 1);
    setStepArray((prev) => [...prev, noOfSteps + 1]);
  };

  const anotherStep = () => {
    setNoOfSteps(noOfSteps + 1);
    setStepArray((prev) => [...prev, noOfSteps + 1]);
    setAddAnotherStep(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value,
      companyid: companyId,
      userid: userId,
    });
  };

  const onSubmit = () => {
    if (Object.keys(formValues).length === 0) {
      toast.warning("Atleast Fill a Single Field !");
    } else {
      handleSubmit();
      addStep();
    }
    setOpen(false);
  };

  const handleSubmit = async () => {
    const data = await schedule.createGroup(formValues);
    if (data.message === "updated successfully") {
      toast.success("Schedule was Updated Successfully");
    } else if (data.message === "added successfully") {
      toast.success("Schedule was Created Successfully");
    } else {
      toast.error("There was some Error while creating a Schedule");
    }
  };

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
                <input
                  id="groupname"
                  onChange={handleChange}
                  type="text"
                  className="form-control bg-white"
                  placeholder="Enter Job Group Name"
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
                <select
                  id="scheduledstatus"
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value={""}>Select Status</option>
                  <option value={"Active"}>Active</option>
                  <option value={"Disabled"}>Disabled</option>
                </select>
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
                <select
                  id="scheduled"
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value={""}>Select Schedule</option>
                  <option value={"Recurring"}>Recurring</option>
                  <option value={"Once"}>Once</option>
                </select>
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
        {noSteps || <OrderedSteps />}
        {stepArray.map((step, index) => {
          return (
            <AddStep
              key={index}
              stepNumber={step}
              deleteStep={noOfSteps === step}
              setAddAnotherStep={setAddAnotherStep}
              setNoSteps={setNoSteps}
              noOfSteps={noOfSteps}
              setNoOfSteps={setNoOfSteps}
              stepArray={stepArray}
              setStepArray={setStepArray}
            />
          );
        })}
        {noSteps && (
          <div className="row">
            <button
              type="button"
              onClick={handleOpen}
              className="btn btn-dark btn-icon-text"
            >
              Create Group and Add New Step
              <i className="fa fa-plus btn-icon-append"></i>
            </button>
          </div>
        )}
        <OurModal
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleYes={onSubmit}
          title={"Create Schedule?"}
          description="Do you really wish to Create a Schedule and proceed to adding Steps? "
        />
        {noSteps ||
          (addAnotherStep && (
            <div className="row">
              <button
                type="button"
                onClick={anotherStep}
                className="btn btn-dark btn-icon-text"
              >
                Add Another Step
                <i className="fa fa-plus btn-icon-append"></i>
              </button>
            </div>
          ))}
      </form>
    </div>
  );
}

export default AddGroup;
