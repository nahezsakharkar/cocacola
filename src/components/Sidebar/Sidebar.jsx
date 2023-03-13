import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import OurModal from "../Common/OurModal/OurModal";
import Loader from "../Common/Loader/Loader";
import auth from "../../services/authService";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function getAdmin() {
    const data = await auth.getCurrentUserDetails();
    setAdmin(data.payload);
    setIsLoading(false);
  }

  function handleLogout() {
    setOpen(false);
    navigate("/Logout");
  }

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <Loader open={isLoading} />
      <ul className="nav">
        <li className="nav-item">
          <Link to="/" className="navbar-brand brand-logo-mini">
            <img
              src="./Assets/logo-icon.png"
              alt="logo"
              style={{ height: "auto", width: "28px" }}
            />
          </Link>
          <Link to="/" className="navbar-brand brand-logo">
            <img
              src="./Assets/logo-wide.png"
              alt="logo"
              style={{ height: "auto", width: "170px" }}
            />
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
          <div className="menu-heading mt-0">SCHEDULE MANAGEMENT</div>
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
            <span className="menu-title">Schedules</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="groups">
            <ul className="nav flex-column sub-menu">
              {/* disabled for support */}
              {admin.admintype === "Admin" && (
                <li className="nav-item">
                  {" "}
                  <NavLink
                    className="nav-link"
                    onClick={(e) => {
                      if (location.pathname.includes("/AddNewGroup/"))
                        e.preventDefault();
                    }}
                    to={
                      location.pathname.includes("/AddNewGroup/")
                        ? location.pathname.includes("/AddNewGroup/AddGroup")
                          ? "/AddNewGroup/AddGroup"
                          : location.pathname.includes("/AddNewGroup/AddStep")
                          ? "/AddNewGroup/AddStep"
                          : "/AddNewGroup/AddFilter"
                        : "/AddNewGroup/AddGroup"
                    }
                  >
                    Add New Group
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                {" "}
                <NavLink
                  className="nav-link"
                  onClick={(e) => {
                    if (location.pathname.includes("/EditGroups/")) {
                      navigate("/ShowGroups");
                    }
                  }}
                  to={
                    location.pathname.includes("/ShowGroups/")
                      ? location.pathname.includes("/ShowGroups/EditGroups/")
                        ? location.pathname.includes(
                            "/ShowGroups/EditGroups/EditGroup"
                          )
                          ? "/ShowGroups/EditGroups/EditGroup"
                          : location.pathname.includes(
                              "/ShowGroups/EditGroups/EditSteps"
                            )
                          ? "/ShowGroups/EditGroups/EditSteps"
                          : "/ShowGroups/EditGroups/EditFilters"
                        : "/ShowGroups/EditGroups/EditGroup"
                      : "/ShowGroups"
                  }
                >
                  Show Jobs Group
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
          <NavLink className="nav-link" to="/Logs">
            <i className="mdi mdi-chart-gantt menu-icon"></i>
            <span className="menu-title"> Logs</span>
          </NavLink>
        </li>
        {/* disabled for support */}
        {admin.admintype === "Admin" && (
          <li className="nav-item">
            <NavLink className="nav-link" to="/Settings">
              <i className="mdi mdi-settings menu-icon"></i>
              <span className="menu-title"> Settings</span>
            </NavLink>
          </li>
        )}
        <li className="nav-item">
          <div className="menu-heading">User Management</div>
        </li>
        {/* disabled for support */}
        {admin.admintype === "Admin" && (
          <li className="nav-item">
            <NavLink className="nav-link" to="/Account">
              <i className="mdi mdi-account menu-icon"></i>
              <span className="menu-title"> Account</span>
            </NavLink>
          </li>
        )}
        <li className="nav-item">
          <Link className="nav-link" onClick={handleOpen}>
            <i className="mdi mdi-logout menu-icon"></i>
            <span className="menu-title"> Logout</span>
          </Link>
          <OurModal
            open={open}
            setOpen={setOpen}
            handleOpen={handleOpen}
            handleClose={handleClose}
            handleYes={handleLogout}
            title={"Logout?"}
            description="Do you really wish to leave and log out? All the unsaved changes will be lost. "
          />
        </li>
        <div className="ps__rail-x" style={{ left: "0px", bottom: "0px" }}>
          <div
            className="ps__thumb-x"
            tabIndex="0"
            style={{ left: "0px", width: "0px" }}
          ></div>
        </div>
        <div
          className="ps__rail-y"
          style={{ top: "0px", height: "626px", right: "0px" }}
        >
          <div
            className="ps__thumb-y"
            tabIndex="0"
            style={{ top: "0px", height: "517px" }}
          ></div>
        </div>
      </ul>
    </nav>
  );
}

export default Sidebar;
