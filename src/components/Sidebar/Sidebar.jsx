import { NavLink, Link } from "react-router-dom";

function Sidebar() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <Link className="navbar-brand brand-logo-mini" to="/">
            <img src="../../images/logo-mini.svg" alt="logo" />
          </Link>
          <Link className="navbar-brand brand-logo" to="/">
            <img src="../../images/logo.svg" alt="logo" />
          </Link>
        </li>
        <li className="nav-item">
          <div className="menu-heading mt-0">MAIN MENU</div>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            <i className="mdi mdi-locker-multiple menu-icon"></i>
            <span className="menu-title">Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#groups"
            aria-expanded="false"
            aria-controls="groups"
          >
            <i className="mdi mdi-group menu-icon"></i>
            <span className="menu-title">Groups</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="groups">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <NavLink className="nav-link" to="/AddGroup">
                  Add New Group
                </NavLink>
              </li>
              <li className="nav-item">
                {" "}
                <NavLink className="nav-link" to="/ShowGroups">
                  Show Existing Groups
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#jobs"
            aria-expanded="false"
            aria-controls="jobs"
          >
            <i className="mdi mdi-wrench menu-icon"></i>
            <span className="menu-title">Jobs</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="jobs">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <NavLink className="nav-link" to="/ActiveJobs">
                  Active Jobs
                </NavLink>
              </li>
              <li className="nav-item">
                {" "}
                <NavLink className="nav-link" to="/JobReport">
                  Job Report
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <div className="menu-heading">Interface</div>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Settings">
            <i className="mdi mdi-settings menu-icon"></i>
            <span className="menu-title"> Settings</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <div className="menu-heading">User Management</div>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Account">
            <i className="mdi mdi-account menu-icon"></i>
            <span className="menu-title"> Account</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Logout">
            <i className="mdi mdi-logout menu-icon"></i>
            <span className="menu-title"> Logout</span>
          </NavLink>
        </li>
        <div class="ps__rail-x" style={{ left: "0px", bottom: "0px" }}>
          <div
            class="ps__thumb-x"
            tabindex="0"
            style={{ left: "0px", width: "0px" }}
          ></div>
        </div>
        <div
          class="ps__rail-y"
          style={{ top: "0px", height: "626px", right: "0px" }}
        >
          <div
            class="ps__thumb-y"
            tabindex="0"
            style={{ top: "0px", height: "517px" }}
          ></div>
        </div>
      </ul>
    </nav>
  );
}

export default Sidebar;
