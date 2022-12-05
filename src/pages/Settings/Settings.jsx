import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import WifiTetheringOffIcon from '@mui/icons-material/WifiTetheringOff';
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
      </div>
    </div>
  );
}

export default Settings;
