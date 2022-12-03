import { Outlet } from "react-router-dom";

// components ------------------------------------
import Header from "../components/Header/Header";
import Settings from "../components/Settings/Settings";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";

const Layout = () => {
  return (
    <div className="sidebar-fixed">
      <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
          <Settings />
          <Sidebar />
          <main className="main-panel">
            <div className="content-wrapper">
              <Outlet />
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
