import { useState, useEffect } from "react";
import DataTable from "../../../components/Common/DataTable/DataTable";
import { TextField } from "@mui/material";
import "../../../custom/css/custom.css";

function Account() {
  // let demo = {
  //   gid: 54,
  //   steps: [{ id: 61 }, { id: 62 }, { id: 63 }, { id: 64 }],
  //   stepSequence: [63, 62, 61, 64],
  // };

  const [fromIndex, setFromIndex] = useState();
  const [toIndex, setToIndex] = useState();

  // localStorage.setItem("demo", JSON.stringify(demo));
  const [group, setGroup] = useState(JSON.parse(localStorage.getItem("demo")));

  const [sequence, setSequence] = useState(group.stepSequence);

  useEffect(() => {}, [group]);

  const table = group.steps.map((items) => {
    const sequence = group.stepSequence.findIndex(
      (number) => number === items.id
    );
    return { ...items, sequence: sequence + 1 };
  });

  const arrayMove = (arr, fromIndex, toIndex) => {
    let newArray = arr;
    var element = newArray[fromIndex];
    newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, element);
    return newArray;
  };

  const handleChange = (e, row) => {
    setFromIndex(row.sequence - 1);
    setToIndex(e.target.value - 1);
  };

  const handleSubmit = () => {
    // setSequence(arrayMove(sequence, fromIndex, toIndex));
    // setGroup();
    localStorage.setItem(
      "demo",
      JSON.stringify({
        ...group,
        stepSequence: arrayMove(sequence, fromIndex, toIndex),
      })
    );
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 2, width: 200 },
    {
      field: "sequence",
      headerName: "Sequence",
      flex: 1.5,
      width: 150,
    },
    {
      field: "order",
      headerName: "Sequence",
      flex: 1.3,
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {rows.length > 1 && (
              <>
                <TextField
                  id="sequence"
                  placeholder="Enter Batch Size"
                  defaultValue={params.row.sequence}
                  onChange={(e) => handleChange(e, params.row)}
                  inputProps={{
                    type: "number",
                    min: 1,
                    max: rows.length,
                  }}
                  variant="outlined"
                />
                <button
                  type="button"
                  className="btn btn-dark btn-icon-text btn-sm"
                  onClick={handleSubmit}
                >
                  Apply
                  <i className="mdi mdi-file-check btn-icon-append"></i>
                </button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  const rows = table;

  return (
    <div className="data activeJobs">
      <div className="body">
        <DataTable columns={columns} rows={rows} toolbar />
      </div>
    </div>
  );
}

export default Account;
