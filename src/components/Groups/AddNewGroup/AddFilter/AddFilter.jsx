import { useState } from "react";
import { toast } from "react-toastify";
import schedule from "../../../../services/scheduleService";
import OurModal from "../../../Common/OurModal/OurModal";

function AddFilter(props) {
  const { stepId } = props;
  const [formValues, setFormValues] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value,
      sid: stepId,
    });
  };

  const onSubmit = () => {
    handleSubmit();
    setOpen(false);
  };

  const handleSubmit = async () => {
    const data = await schedule.createFilter(formValues);
    if (data.message === "updated successfully") {
      toast.success("Filter was Updated Successfully");
    } else if (data.message === "added successfully") {
      toast.success("Filter was Created Successfully");
    } else {
      toast.error("There was some Error while creating a Filter");
    }
  };

  return (
    <div className="card-body border border-secondary rounded mb-3">
      <h4 className="card-title">Add Filter</h4>
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
              id="field"
              onChange={handleChange}
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
              onChange={handleChange}
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
              id="filtervalue"
              type="text"
              className="form-control"
              placeholder="Enter Field Value"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="filterField">
          <div className="label">
            <label className="col-sm-3 col-form-label">Actions</label>
          </div>
          <div className="input">
            <button
              onClick={handleOpen}
              type="button"
              className="btn btn-dark btn-icon-text"
            >
              Add
              <i className="fa fa-plus btn-icon-append"></i>
            </button>
            <OurModal
              open={open}
              setOpen={setOpen}
              handleOpen={handleOpen}
              handleClose={handleClose}
              handleYes={onSubmit}
              title={"Create Filter?"}
              description="Do you really wish to Create a Filter? "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFilter;
