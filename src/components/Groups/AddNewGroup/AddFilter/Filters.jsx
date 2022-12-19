import { useEffect } from "react";
import DataTable from "../../../Common/DataTable/DataTable";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

function Filters(props) {
  const { filters, isLoading } = props;

  useEffect(() => {}, [filters]);

  const columns = [
    { field: "field", headerName: "Field", flex: 1, width: 300 },
    {
      field: "operator",
      headerName: "Operator",
      flex: 0.5,
      width: 150,
    },
    {
      field: "filtervalue",
      headerName: "Value",
      flex: 1,
      width: 300,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1.2,
      width: 250,
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
              Remove
              <i className="ti-trash btn-icon-append"></i>
            </button>
          </div>
        );
      },
    },
  ];

  const rows =
    Object.keys([filters].flat()[0]).length === 0
      ? [].flat()
      : [filters].flat();

  return (
    <div className="filters mt-3">
      <div className="title">
        <h4 className="card-title">Filters</h4>
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

export default Filters;
