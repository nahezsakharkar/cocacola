import { useEffect, useState } from "react";
import schedule from "../../../../services/scheduleService";
import Filters from "./Filters";
import AddFilter from "../AddFilter/AddFilter";
import Tooltip from "@mui/material/Tooltip";
import OurModal from "../../../Common/OurModal/OurModal";
import { toast } from "react-toastify";

function AddStep(props) {
  const {
    stepNumber,
    groupId,
    deleteStep,
    setAddAnotherStep,
    noSteps,
    setNoSteps,
    noOfSteps,
    setNoOfSteps,
    stepArray,
    setStepArray,
  } = props;

  const [noFilters, setNoFilters] = useState(true);
  const [noOfFilters, setNoOfFilters] = useState(0);

  const [interfaces, setInterfaces] = useState([]);

  const [formValues, setFormValues] = useState({
    batching: 0,
    detailedlog: 0,
    forcesync: 0,
    sequence: stepNumber,
  });

  const [stepId, setStepId] = useState(0);

  const [openRemoveStep, setOpenRemoveStep] = useState(false);
  const handleOpenRemoveStep = () => setOpenRemoveStep(true);
  const handleCloseRemoveStep = () => setOpenRemoveStep(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function getInterfaces() {
    const data = await schedule.getAllInterfaces();
    setInterfaces(data.payload);
  }

  const addFilter = () => {
    setNoFilters(false);
    setNoOfFilters(noOfFilters + 1);
    setAddAnotherStep(true);
  };

  useEffect(() => {
    getInterfaces();
  }, []);

  // console.log("Number of Steps : ", noOfSteps);

  const onRemoveStep = () => {
    // console.log("Number of Steps before Minus : ", noOfSteps);
    setNoOfSteps(noOfSteps - 1);

    setStepArray((prevArray) => {
      return prevArray.filter((item) => item !== noOfSteps);
    });

    setDefaults();
    setOpenRemoveStep(false);
  };

  const setDefaults = () => {
    if (noOfSteps === 0) {
      setNoSteps(true);
    }
    // console.log("Number of Steps after Minus : ", noOfSteps);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value,
      gid: groupId,
    });

    if (e.target.id === "batching") {
      setFormValues({
        ...formValues,
        [id]: e.target.checked === true ? 1 : 0,
        gid: groupId,
      });
    }
    if (e.target.id === "forcesync") {
      setFormValues({
        ...formValues,
        [id]: e.target.checked === true ? 1 : 0,
        gid: groupId,
      });
    }
    if (e.target.id === "detailedlog") {
      setFormValues({
        ...formValues,
        [id]: e.target.checked === true ? 1 : 0,
        gid: groupId,
      });
    }
  };

  const onSubmit = () => {
    handleSubmit();
    addFilter();
    setOpen(false);
  };

  const handleSubmit = async () => {
    const data = await schedule.createStep(formValues);
    setStepId(data.payload.id)
    if (data.message === "updated successfully") {
      toast.success("Step was Updated Successfully");
    } else if (data.message === "added successfully") {
      toast.success("Step was Created Successfully");
    } else {
      toast.error("There was some Error while creating a Step");
    }
  };

  return (
    <div className="card-body border border-secondary rounded mb-3">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <h4 className="card-title">Step #{stepNumber}</h4>
        {deleteStep && (
          <button
            onClick={handleOpenRemoveStep}
            type="button"
            className="close"
            aria-label="Close"
          >
            <Tooltip title="Remove Step" placement="left" arrow>
              <span aria-hidden="true">&times;</span>
            </Tooltip>
          </button>
        )}
        <OurModal
          open={openRemoveStep}
          setOpen={setOpenRemoveStep}
          handleOpen={handleOpenRemoveStep}
          handleClose={handleCloseRemoveStep}
          handleYes={onRemoveStep}
          title={"Remove Step?"}
          description="Do you really wish to Remove this Step? All Form Data will be lost. "
        />
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">
              Interface <span className="text-danger">*</span>
            </label>
            <div className="col-sm-9">
              <select id="iid" onChange={handleChange} className="form-control">
                <option value={""}>Select Interface</option>
                {interfaces.map((single) => {
                  return (
                    <option key={single.id} value={single.id}>
                      {single.name}
                    </option>
                  );
                })}
              </select>
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
              <select
                id="synctype"
                onChange={handleChange}
                className="form-control"
              >
                <option>Select Sync Type</option>
                <option>Full</option>
                <option>Delta</option>
              </select>
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
                  <input
                    id="syncdate"
                    onChange={handleChange}
                    type="date"
                    className="form-control"
                    placeholder="dd/mm/yyyy"
                  />
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
                <label className="col-sm-6 col-form-label">Enable Batch</label>
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
                  <input
                    id="batchsize"
                    onChange={handleChange}
                    type="number"
                    className="form-control"
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
      {noFilters || <Filters />}
      {noFilters || <AddFilter stepId={stepId} />}
      {noFilters && (
        <div className="row">
          <button
            type="button"
            className="btn btn-dark btn-icon-text"
            onClick={handleOpen}
          >
            Confirm Step and Add Filter
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
        title={"Create Step?"}
        description="Do you really wish to Create a Step and proceed to adding Filter? "
      />
    </div>
  );
}

export default AddStep;
