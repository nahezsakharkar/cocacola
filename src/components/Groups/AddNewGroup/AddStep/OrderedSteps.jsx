import { useNavigate } from "react-router-dom";
import DataTable from "../../../Common/DataTable/DataTable";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect } from "react";

function OrderedSteps(props) {
  const { group, steps, interfaces, isLoading } = props;
  const navigate = useNavigate();

  useEffect(() => {}, [steps]);

  const columns = [
    { field: "sequence", headerName: "Step", flex: 0.8, width: 150 },
    {
      field: "iname",
      headerName: "Interface",
      flex: 1.4,
      width: 350,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      width: 400,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button type="button" className="btn btn-dark btn-icon-text btn-sm">
              Edit
              <i className="mdi mdi-file-check btn-icon-append"></i>
            </button>
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
      headerName: "Order",
      flex: 1,
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Tooltip title="Move Up" placement="left" arrow>
              <KeyboardDoubleArrowUpIcon />
            </Tooltip>
            <Tooltip title="Move Down" placement="right" arrow>
              <KeyboardDoubleArrowDownIcon />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const rowsSuitableSteps =
    Object.keys([steps].flat()[0]).length === 0 ? [].flat() : [steps].flat();

  const rows = rowsSuitableSteps.map((items) => {
    const interfaceName = interfaces.find((it) => it.id === items.iid)?.name;
    return { ...items, iname: interfaceName };
  });

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
