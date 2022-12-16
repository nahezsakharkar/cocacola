import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import schedule from "../../../../services/scheduleService";
import OurModal from "../../../../components/Common/OurModal/OurModal";
import OrderedSteps from "./OrderedSteps";

function AddStep() {
  const location = useLocation();

  var { group } = location.state;

  const [interfaces, setInterfaces] = useState([]);
  const [steps, setSteps] = useState({ id: "default" });

  const step_form = useRef(null);

  const [formValues, setFormValues] = useState({
    gid: group.id,
    batching: 0,
    detailedlog: 0,
    forcesync: 0,
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function getInterfaces() {
    const data = await schedule.getAllInterfaces();
    setInterfaces(data.payload);
  }

  async function getSteps(groupId) {
    const data = await schedule.getAllSteps(groupId);
    setSteps(data.payload);
  }

  useEffect(() => {
    getInterfaces();
    getSteps(group.id);
  }, [group.id, steps]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });

    if (e.target.id === "batching") {
      setFormValues({
        ...formValues,
        [id]: e.target.checked === true ? 1 : 0,
      });
    }
    if (e.target.id === "forcesync") {
      setFormValues({
        ...formValues,
        [id]: e.target.checked === true ? 1 : 0,
      });
    }
    if (e.target.id === "detailedlog") {
      setFormValues({
        ...formValues,
        [id]: e.target.checked === true ? 1 : 0,
      });
    }
  };

  const onSubmit = () => {
    handleSubmit();
  };

  const handleSubmit = async () => {
    const data = await schedule.createStep({
      ...formValues,
      sequence: steps.id === "default" ? 1 : Object.keys(steps).length + 1,
    });
    if (data.message === "updated successfully") {
      toast.success("Step was Updated Successfully");
    } else if (data.message === "added successfully") {
      toast.success("Step was Created Successfully");
    } else {
      toast.error("There was some Error while creating a Step");
    }
    setOpen(false);
    step_form.current.reset();
    // window.location.reload(false);
    // navigate("/AddNewGroup/AddStep", { state: { group: group} });
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
        <h4 className="card-title">
          Adding Steps into {group.groupname} Group
        </h4>
      </div>
      <form ref={step_form} onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">
                Interface <span className="text-danger">*</span>
              </label>
              <div className="col-sm-9">
                <select
                  id="iid"
                  onChange={handleChange}
                  className="form-control"
                >
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
                  <label className="col-sm-6 col-form-label">
                    Enable Batch
                  </label>
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
      </form>
      <div className="row" style={{ justifyContent: "center" }}>
        <button
          type="button"
          className="btn btn-dark btn-icon-text"
          onClick={handleOpen}
        >
          Confirm Step
          <i className="fa fa-plus btn-icon-append"></i>
        </button>
      </div>
      <OurModal
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleYes={onSubmit}
        title={"Create Step?"}
        description="Do you really wish to Create this Step? "
      />
      <OrderedSteps group={group} steps={steps} interfaces={interfaces} />
    </div>
  );
}

export default AddStep;
