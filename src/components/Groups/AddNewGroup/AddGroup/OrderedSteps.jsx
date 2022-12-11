import DataTable from "../../../Common/DataTable/DataTable";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import Tooltip from "@mui/material/Tooltip";

function OrderedSteps() {
  const columns = [
    { field: "step", headerName: "Step", flex:.8, width: 150 },
    {
      field: "interface",
      headerName: "Interface",
      flex:1.4,
      width: 350,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      flex:1.3,
      width: 400,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button type="button" className="btn btn-dark btn-icon-text btn-sm">
              Edit
              <i className="mdi mdi-file-check btn-icon-append"></i>
            </button>
            <button type="button" className="btn btn-danger btn-icon-text btn-sm">
              Delete
              <i className="ti-trash btn-icon-append"></i>
            </button>
          </div>
        );
      },
    },
    {
      field: "order",
      headerName: "Order",
      flex:1,
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

  const rows = [
    { id: 1, step: 1, interface: "Set Product Catagory" },
    { id: 2, step: 2, interface: "Set Product Master" },
  ];

  return (
    <div className="steps">
      <div className="title">
        <h4 className="card-title">Steps</h4>
      </div>
      <div className="body">
        <DataTable columns={columns} rows={rows} />
      </div>
    </div>
  );
}

export default OrderedSteps;
