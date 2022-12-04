import React from "react";

function AddStepComponent() {
  return (
    <>
      <div className="container mt-2">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Add New Step</h4>
            <form className="form-sample">
              <p className="card-description">
                Fields marked with <span className="text-danger">*</span> are
                required
              </p>
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
                <div className="col-md-6">
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
                </div>
              </div>
              <div className="row">
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
                        <label className="col-sm-5 col-form-label">
                          Enable Force Sync Date
                        </label>
                        <div className="col-sm-5">
                          <div className="form-check">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked=""
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-4 col-form-label">
                          Sync Date
                        </label>
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
                <div className="col-6">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group row d-flex">
                        <label className="col-sm-5 col-form-label">
                          Enable Batch
                        </label>
                        <div className="col-sm-5">
                          <div className="form-check">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked=""
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-4 col-form-label">
                          Batch Size
                        </label>
                        <div className="col-sm-8">
                          <input type="number" className="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row d-flex">
                    <label className="col-sm-5 col-form-label">
                      Enable Batch
                    </label>
                    <div className="col-sm-5">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked=""
                          />
                          <i className="input-helper"></i>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddStepComponent;
