import OrderedSteps from "./OrderedSteps";

function AddGroup() {
  return (
    <>
      <div className="container mt-2">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Add New Group</h4>
            <form className="form-sample">
              <p className="card-description">
                Fields marked with <span className="text-danger">*</span> are
                required
              </p>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">
                      Job Group Name<span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">
                      Status <span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-9">
                      <select className="form-control">
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
                    <label className="col-sm-3 col-form-label">
                      Schedule<span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-9">
                      <select className="form-control">
                        <option>Select Schedule</option>
                        <option>Recurring</option>
                        <option>Once</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">
                      Frequency<span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-9">
                      <select className="form-control">
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
                    <label className="col-sm-3 col-form-label">
                      Start Date<span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="date"
                        className="form-control"
                        placeholder="dd/mm/yyyy"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-9">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Test Run</label>

                    <div className="col-sm-5">
                      <div className="form-check">
                        <div className="form-check mx-sm-2">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
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
            </form>
          </div>
        </div>
      </div>
      <OrderedSteps />
    </>
  );
}

export default AddGroup;
