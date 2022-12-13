import { useEffect, useState } from "react";
import schedule from "../../../../services/scheduleService";
import Filters from "./Filters";
import AddFilter from "../AddFilter/AddFilter";
import Tooltip from "@mui/material/Tooltip";
import OurModal from "../../../Common/OurModal/OurModal";

function AddStep(props) {
  const {
    stepNumber,
    deleteStep,
    setAddAnotherStep,
    setNoSteps,
    noOfSteps,
    setNoOfSteps,
    stepArray,
    setStepArray,
  } = props;

  const [noFilters, setNoFilters] = useState(true);
  const [noOfFilters, setNoOfFilters] = useState(0);

  const [interfaces, setInterfaces] = useState([]);

  const [openRemoveStep, setOpenRemoveStep] = useState(false);
  const handleOpenRemoveStep = () => setOpenRemoveStep(true);
  const handleCloseRemoveStep = () => setOpenRemoveStep(false);

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

  const onRemoveStep = () => {
    setNoOfSteps(noOfSteps - 1);
    setStepArray((prevArray) => {
      return prevArray.filter((item) => item !== noOfSteps);
    });
    if (noOfSteps === 0) {
      setNoSteps(true);
    }
    setOpenRemoveStep(false);
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
              <select className="form-control">
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
              <select className="form-control">
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
                      <input type="checkbox" className="form-check-input" />
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
                      <input type="checkbox" className="form-check-input" />
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
                  <input type="number" className="form-control" />
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
                      <input type="checkbox" className="form-check-input" />
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
      {noFilters || <AddFilter />}
      {noFilters && (
        <div className="row">
          <button
            type="button"
            className="btn btn-dark btn-icon-text"
            onClick={addFilter}
          >
            Confirm Step and Add Filter
            <i className="fa fa-plus btn-icon-append"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default AddStep;
