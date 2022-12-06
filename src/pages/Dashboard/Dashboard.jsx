// import { Link } from "react-router-dom";
import DataTable from "../../components/Common/DataTable/DataTable";
import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import WifiTetheringOffIcon from "@mui/icons-material/WifiTetheringOff";
import "../../custom/css/custom.css";

function Dashboard() {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  const columns = [
    { field: "interface", headerName: "Interface", width: 200 },
    {
      field: "vxceedCount",
      headerName: "Vxceed Count",
      width: 150,
      editable: true,
    },
    {
      field: "sapCount",
      headerName: "Sap Count",
      width: 150,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button type="button" className="btn btn-outline-secondary btn-sm">
              Report
            </button>
          </div>
        );
      },
    },
  ];

  const rows = [
    { id: 1, interface: "Purchase Orders", vxceedCount: 28, sapCount: 27 },
    { id: 2, interface: "Claims", vxceedCount: 6, sapCount: 6 },
    { id: 3, interface: "Invoices", vxceedCount: 0, sapCount: 0 },
    { id: 4, interface: "GRN", vxceedCount: 10, sapCount: 0 },
  ];

  return (
    <div className="data dashboard">
      <div className="title">
        <h1 className="Heading">Dashboard</h1>
        <h3 className="Heading">{dateTime}</h3>
      </div>
      <div className="body">
        <DataTable columns={columns} rows={rows} toolbar />
        <div className="connection">
          <div className="connection-head">
            <i className="fa fa-chain display-5"></i>
            <div className="connection-title">CONNECTION STATUS</div>
          </div>
          <div className="connection-body">
            <div className="connection-inner">
              <h4 className="Heading">SAP CONNECTION</h4>
              <WifiTetheringIcon />
            </div>
            <div className="connection-inner">
              <h4 className="Heading">VAXCEED CONNECTION</h4>
              <WifiTetheringOffIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
