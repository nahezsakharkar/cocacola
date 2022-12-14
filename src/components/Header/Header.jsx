import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import auth from "../../services/authService";

function Header() {
  const [companyId, setCompanyId] = useState(0);
  const [country, setCountry] = useState("");
  const [admin, setAdmin] = useState({});

  async function getAdmin() {
    const data = await auth.getCurrentUserDetails();
    setAdmin(data.payload);
  }

  useEffect(() => {
    getAdmin();
    setCompanyId(admin.companyid);
    if (companyId === 1429 || companyId === 1430) {
      setCountry("np");
    } else if (companyId === 1428) {
      setCountry("lk");
    } else if (companyId === 1364) {
      setCountry("bd");
    }
  }, [admin.companyid, companyId]);

  return (
    <nav className="navbar col-lg-12 col-12 p-0 d-flex flex-row">
      <div className="navbar-brand-wrapper d-flex align-items-center justify-content-start">
        <Link to="/" className="navbar-brand brand-logo-mini">
          <img
            src="./Assets/logo-icon.png"
            alt="logo"
            style={{ height: "auto", width: "45px" }}
          />
        </Link>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-toggle="minimize"
          >
            <span className="mdi mdi-menu"></span>
          </button>
          <div className="welcome-message d-lg-flex d-none">
            Hi, welcome back!
          </div>
        </div>
        <ul className="navbar-nav mr-lg-2">
          <li className="nav-item nav-search d-none d-lg-block">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="search"
                aria-label="search"
                aria-describedby="search"
              />
              <div className="input-group-append">
                <span className="input-group-text" id="search">
                  <i className="mdi mdi-magnify"></i>
                </span>
              </div>
            </div>
          </li>
        </ul>
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item">
            <i
              className={`flag-icon flag-icon-${country} icon-md`}
              // style={{ fontSize: "1.75rem" }}
            ></i>{" "}
            {country ? country.toUpperCase() : null}
          </li>

          {/* <li className="nav-item dropdown">
            <a
              className="nav-link count-indicator dropdown-toggle"
              id="notificationDropdown"
              href=" "
              data-toggle="dropdown"
            >
              <i className="mdi mdi-bell mx-0"></i>
              <span className="count">2</span>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
              aria-labelledby="notificationDropdown"
            >
              <h6 className="p-3 mb-0">Notifications</h6>
              <div className="dropdown-divider"></div>
              <a href=" " className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon text-center rounded-circle">
                    <i className="mdi mdi-calendar text-success"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject mb-1">Event today</h6>
                  <p className="text-muted ellipsis mb-0">
                    {" "}
                    Just a reminder that you have an event today{" "}
                  </p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a href=" " className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon text-center rounded-circle">
                    <i className="mdi mdi-settings text-danger"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject mb-1">Settings</h6>
                  <p className="text-muted ellipsis mb-0"> Update dashboard </p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a href=" " className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon text-center rounded-circle">
                    <i className="mdi mdi-link-variant text-warning"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject mb-1">Launch Admin</h6>
                  <p className="text-muted ellipsis mb-0"> New admin wow! </p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <p className="p-3 mb-0 text-center">See all notifications</p>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link count-indicator dropdown-toggle"
              id="mailDropdown"
              href=" "
              data-toggle="dropdown"
            >
              <i className="mdi mdi-email-open mx-0"></i>
              <span className="count">3</span>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
              aria-labelledby="mailDropdown"
            >
              <a href=" " className="dropdown-item">
                <p className="mb-0 font-weight-normal float-left">
                  You have 4 new notifications
                </p>
                <span className="badge badge-pill badge-warning float-right">
                  View all
                </span>
              </a>
              <div className="dropdown-divider"></div>
              <a href=" " className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-success">
                    <i className="mdi mdi-information mx-0"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-medium">
                    Application Error
                  </h6>
                  <p className="font-weight-light small-text mb-0">Just now</p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a href=" " className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-warning">
                    <i className="mdi mdi-settings mx-0"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-medium">
                    Settings
                  </h6>
                  <p className="font-weight-light small-text mb-0">
                    Private message
                  </p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a href=" " className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-info">
                    <i className="mdi mdi-account-box mx-0"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-medium">
                    New user registration
                  </h6>
                  <p className="font-weight-light small-text mb-0">
                    2 days ago
                  </p>
                </div>
              </a>
            </div>
          </li> */}
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span className="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
  );
}

export default Header;
