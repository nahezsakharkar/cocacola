// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import DataTable from "../../../Common/DataTable/DataTable";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

function OrderedSteps(props) {
  const { group, steps, isLoading } = props;
  const navigate = useNavigate();

  // const [rowSequence, setRowSequence] = useState({});

  // const handleSequenceChange = (e, row) => {
  //   // console.log(row);
  //   const { id, value } = e.target;
  //   setRowSequence({ [id]: value });
  // };

  // console.log(rowSequence);

  const rowsSuitableSteps =
    Object.keys([steps].flat()[0]).length === 0
      ? [].flat()
      : [steps].flat();

  const rows = rowsSuitableSteps

  const columns = [
    { field: "sequence", headerName: "Step", flex: 0.8, width: 150 },
    {
      field: "interfacename",
      headerName: "Interface",
      flex: 1.4,
      width: 350,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1.7,
      width: 400,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <button type="button" className="btn btn-dark btn-icon-text btn-sm">
              Edit
              <i className="mdi mdi-file-check btn-icon-append"></i>
            </button> */}
            <button
              type="button"
              className="btn btn-danger btn-icon-text btn-sm"
            >
              Delete
              <i className="ti-trash btn-icon-append"></i>
            </button>
            <button
              type="button"
              className="btn btn-warning btn-icon-text btn-sm"
              onClick={() =>
                navigate("/AddNewGroup/AddFilter", {
                  state: { step: params.row, group: group },
                })
              }
            >
              Manage Filters
              <i className="fa fa-filter btn-icon-append"></i>
            </button>
          </div>
        );
      },
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
                  // error={errors.sequence ? true : false}
                  id="sequence"
                  placeholder="Enter Batch Size"
                  defaultValue={params.row.sequence}
                  // onChange={(e) => handleSequenceChange(e, params.row)}
                  inputProps={{
                    type: "number",
                    min: 1,
                    max: rows.length,
                  }}
                  // helperText={errors.sequence}
                  variant="outlined"
                />
                <button
                  type="button"
                  className="btn btn-dark btn-icon-text btn-sm"
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

  return (
    <div className="steps mt-3">
      <div className="title">
        <h4 className="card-title">Steps</h4>
      </div>
      <div className="body">
        {isLoading && (
          <Stack sx={{ width: "100%", color: "#f02632" }} spacing={2}>
            <LinearProgress color="inherit" />
          </Stack>
        )}
        <DataTable columns={columns} rows={rows} />
      </div>
    </div>
  );
}

export default OrderedSteps;
