import React, { useState } from "react";

function AddFilter() {
  const [filters, setFilters] = useState([{
    fieldId: "CustomerId",
    operator: "EQUALS",
    fieldVal: "900282",
  }]);

  const [filterForm, setFilterForm] = useState({
    fieldId: "",
    operator: "",
    fieldVal: "",
  });

  const handleAdd = () => {
    let filtersArr = filters;
    filtersArr.push(filterForm);
    setFilterForm({
        fieldId: "",
        operator: "",
        fieldVal: "",
      })
    setFilters(filtersArr);
  };

  const handleDelete = (id) => {
    let filtersArr = filters.filter(item=>item.fieldId !== id);
    setFilters(filtersArr);
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFilterForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };


  return (
    <div className="container card mt-2">
      <div className="card-body">
        <h4 className="card-title">Filters</h4>
        <button
          type="button"
          class="btn btn-inverse-success btn-fw btn-sm mt-4 mb-2"
          onClick={handleAdd}
        >
          Add Filter
        </button>
        <div className="table-responsive w-75">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Field</th>
                <th>Operator</th>
                <th>Value</th>
                <th colSpan={2} className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Field Name"
                    id="fieldId"
                    name="fieldId"
                    onChange={handleChange}
                    value={filterForm.fieldId}
                  />
                </td>
                <td>
                  <select
                    id="operator"
                    name="operator"
                    onChange={handleChange}
                    defaultValue={filterForm.operator}
                    className="form-control"
                  >
                    <option value="">Select Operator</option>
                    <option value="EQUALS">EQUALS</option>
                    <option value="LIKE">LIKE</option>
                  </select>
                </td>
                <td>
                  <input
                    id="fieldVal"
                    type="text"
                    className="form-control"
                    placeholder="Enter Field Value"
                    name="fieldVal"
                    value={filterForm.fieldVal}
                    onChange={handleChange}
                  />
                </td>
                
              </tr>
              {filters.map((filter) => {
                return (
                  <tr key={filter.fieldId}>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Field Name"
                        id={filter.fieldId}
                        name="fieldId"
                        value={filter.fieldId}
                      />
                    </td>
                    <td>
                      <select
                        id={`${filter.fieldId}-${filter.operator}`}
                        name="operator"
                        defaultValue={filter.operator}
                        className="form-control"
                      >
                        <option value="">Select Operator</option>
                        <option value="EQUALS">EQUALS</option>
                        <option value="LIKE">LIKE</option>
                      </select>
                    </td>
                    <td>
                      <input
                        id={`${filter.fieldId}-${filter.fieldVal}`}
                        type="text"
                        className="form-control"
                        placeholder="Enter Field Value"
                        name="fieldVal"
                        value={filter.fieldVal}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-inverse-warning btn-fw btn-sm"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-inverse-danger btn-fw btn-sm"
                        onClick = {()=>handleDelete(filter.fieldId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddFilter;
