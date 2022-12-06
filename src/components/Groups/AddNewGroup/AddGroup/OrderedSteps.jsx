import DataTable from "../../../Common/DataTable/DataTable";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import Tooltip from "@mui/material/Tooltip";

function OrderedSteps() {
  const columns = [
    { field: "step", headerName: "Step", width: 200 },
    {
      field: "interface",
      headerName: "Interface",
      width: 350,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button type="button" class="btn btn-dark btn-icon-text btn-sm">
              Edit
              <i class="mdi mdi-file-check btn-icon-append"></i>
            </button>
            <button type="button" class="btn btn-danger btn-icon-text btn-sm">
              Delete
              <i class="ti-trash btn-icon-append"></i>
            </button>
          </div>
        );
      },
    },
    {
      field: "order",
      headerName: "Order",
      width: 200,
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

  const rows = [
    { id: 1, step: 1, interface: "Set Product Catagory" },
    { id: 2, step: 2, interface: "Set Product Master" },
  ];

  return (
    <div className="steps">
      <DataTable columns={columns} rows={rows} />
    </div>
  );
}

export default OrderedSteps;
