import Filters from "./Filters";
import AddFilter from "../AddFilter/AddFilter";
import Tooltip from "@mui/material/Tooltip";

function AddStep() {
  return (
    <div className="card-body border border-secondary rounded mb-3">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <h4 className="card-title">Step #1</h4>
        <button type="button" className="close" aria-label="Close">
          <Tooltip title="Remove Step" placement="left" arrow>
            <span aria-hidden="true">&times;</span>
          </Tooltip>
        </button>
      </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">
                Interface <span className="text-danger">*</span>
              </label>
              <div className="col-sm-9">
                <select className="form-control">
                  <option>Select Interface</option>
                  <option>Interface-1</option>
                  <option>Interface-2</option>
                  <option>Interface-3</option>
                </select>
              </div>
            </div>
          </div>
          {/* <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">
                Filters <span className="text-danger">*</span>
              </label>
              <div className="col-sm-9">
                <select className="form-control">
                  <option>Select Filter</option>
                  <option>Filter-1</option>
                  <option>Filter-2</option>
                </select>
              </div>
            </div>
          </div> */}
          <div className="col-md-6">
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
          </div>
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
                  <label className="col-sm-6 col-form-label">
                    Enable Batch
                  </label>
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
        <Filters />
        <AddFilter />
        <div className="row">
          <button type="button" className="btn btn-dark btn-icon-text">
            Add Filter
            {/* Add Another Filter */}
            <i className="fa fa-plus btn-icon-append"></i>
          </button>
        </div>
    </div>
  );
}

export default AddStep;
