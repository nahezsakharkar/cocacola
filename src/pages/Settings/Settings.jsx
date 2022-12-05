import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import WifiTetheringOffIcon from "@mui/icons-material/WifiTetheringOff";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import "../../custom/css/custom.css";

function Settings() {
  return (
    <div className="settings">
      <div className="title">
        <h1 className="Heading">Settings</h1>
      </div>
      <div className="body">
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
        <div className="alerts">
          <div className="alerts-head">
            <ForwardToInboxIcon />
            <div className="alerts-title">Alerts</div>
          </div>
          <div className="alerts-body">
            <div className="alerts-inner">
              <h4 className="Heading">Error Alerts</h4>
              <h5 className="text-muted">Emails </h5>
              {/* <WifiTetheringIcon /> */}
            </div>
            <div className="alerts-inner">
              <h4 className="Heading">All Alerts</h4>
              <h5 className="text-muted">Emails </h5>
              {/* <WifiTetheringOffIcon /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
