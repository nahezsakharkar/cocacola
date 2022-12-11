import { useState, useEffect } from "react";
import OrderedSteps from "./OrderedSteps";
import AddStep from "../AddStep/AddStep";

function AddGroup() {
  const [noSteps, setNoSteps] = useState(true);
  const [noOfSteps, setNoOfSteps] = useState(0);
  const [stepArray, setStepArray] = useState([]);

  const addStep = () => {
    setNoSteps(false);
    setNoOfSteps(noOfSteps + 1);
    setStepArray((prev) => [...prev, noOfSteps + 1]);
  };

  const anotherStep = () => {
    setNoOfSteps(noOfSteps + 1);
    setStepArray((prev) => [...prev, noOfSteps + 1]);
  };

  useEffect(() => {
    console.log(noOfSteps);
    console.log(stepArray);
  }, [noOfSteps, stepArray]);

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
                <select id="scheduledstatus" className="form-control">
                  <option>Select Status</option>
                  <option>Active</option>
                  <option>Disabled</option>
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
                <select id="scheduled" className="form-control">
                  <option>Select Schedule</option>
                  <option>Recurring</option>
                  <option>Once</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row">
              <label htmlFor="frequency" className="col-sm-3 col-form-label">
                Frequency<span className="text-danger">*</span>
              </label>
              <div className="col-sm-9">
                <select id="frequency" className="form-control">
                  <option>5 mins</option>
                  <option>10 mins</option>
                  <option>15 mins</option>
                  <option>30 mins</option>
                  <option>Daily</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group row">
              <label htmlFor="startdate" className="col-sm-3 col-form-label">
                Start Date<span className="text-danger">*</span>
              </label>
              <div className="col-sm-9">
                <input
                  id="startdate"
                  type="date"
                  className="form-control"
                  placeholder="dd/mm/yyyy"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Test Run</label>
              <div className="col-sm-9">
                <div className="form-check">
                  <div className="form-check mx-sm-2">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" />
                      <i className="input-helper"></i>
                      <p className="card-description">
                        data will not be sent to server but will be logged
                        locally
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {noSteps || <OrderedSteps />}
        {stepArray.map((step, index) => {
          return <AddStep key={index} stepNumber={step} />;
        })}
        {noSteps && (
          <div className="row">
            <button
              type="button"
              onClick={addStep}
              className="btn btn-dark btn-icon-text"
            >
              Create Group and Add New Step
              <i className="fa fa-plus btn-icon-append"></i>
            </button>
          </div>
        )}
        {noSteps || (
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
        )}
      </form>
    </div>
  );
}

export default AddGroup;
