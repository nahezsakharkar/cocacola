function AddFilter() {
  return (
    <div className="card-body border border-secondary rounded mb-3">
      <h4 className="card-title">Add Filter</h4>
      <form>
        <div className="filterForm">
          <div className="filterField">
            <div className="label">
              <label className="col-sm-3 col-form-label">Field</label>
            </div>
            <div className="input">
              <input
                type="text"
                className="form-control bg-white"
                placeholder="Enter Field Name"
                id="fieldId"
                name="fieldId"
                // onChange={handleChange}
                // value={filterForm.fieldId}
              />
            </div>
          </div>
          <div className="filterField">
            <div className="label">
              <label className="col-sm-3 col-form-label">Operator</label>
            </div>
            <div className="input">
              <select
                id="operator"
                name="operator"
                // onChange={handleChange}
                // defaultValue={filterForm.operator}
                className="form-control"
              >
                <option value="">Select Operator</option>
                <option value="EQUALS">EQUALS</option>
                <option value="LIKE">LIKE</option>
              </select>
            </div>
          </div>
          <div className="filterField">
            <div className="label">
              <label className="col-sm-3 col-form-label">Value</label>
            </div>
            <div className="input">
              <input
                id="fieldVal"
                type="text"
                className="form-control"
                placeholder="Enter Field Value"
                name="fieldVal"
                // value={filterForm.fieldVal}
                // onChange={handleChange}
              />
            </div>
          </div>
          <div className="filterField">
            <div className="label">
              <label className="col-sm-3 col-form-label">Actions</label>
            </div>
            <div className="input">
              <button type="button" class="btn btn-dark btn-icon-text">
                Add
                <i class="fa fa-plus btn-icon-append"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddFilter;
