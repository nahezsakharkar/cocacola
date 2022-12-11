import './App.scss';
import { Routes, Route, Navigate } from "react-router-dom";

//importing the layout
import Layout from './layouts/Layout';

// pages -----------------------------------------
import Login from "./pages/Login/Login"
import Dashboard from "./pages/Dashboard/Dashboard"
import AddNewGroup from "./pages/Groups/AddNewGroup/AddNewGroup"
import ShowGroups from "./pages/Groups/ShowGroups/ShowGroup"
import ActiveJobs from "./pages/Jobs/ActiveJobs/ActiveJobs"
import JobReport from "./pages/Jobs/JobReport/JobReport"
import Settings from "./pages/Settings/Settings"
import Account from "./pages/UserInformation/Account/Account"
import Logout from "./pages/UserInformation/Logout/Logout"
import Error404 from "./pages/Errors/404/404"
import Error500 from "./pages/Errors/500/500"

//helpers
import { LoggedRoute } from './helpers/LoggedRoute';
import { ProtectedRoute } from './helpers/ProtectedRoute';

//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="Login" element={<LoggedRoute> <Login /> </LoggedRoute>} />
        <Route path="Logout" element={<Logout />} />
        <Route element={<ProtectedRoute> <Layout /> </ProtectedRoute>}>
          <Route index path="/" element={<Dashboard />} />
          <Route path="AddNewGroup" element={<AddNewGroup />} />
          <Route path="ShowGroups" element={<ShowGroups />} />
          <Route path="ActiveJobs" element={<ActiveJobs />} />
          <Route path="JobReport" element={<JobReport />} />
          <Route path="Settings" element={<Settings />} />
          <Route path="Account" element={<Account />} />
        </Route>
        <Route path="Error500" element={<Error500 />} />
        <Route path="Error404" element={<Error404 />} />
        <Route path="*" element={<Navigate to="Error404" replace />} />
      </Routes>
    </div>
  );
}

export default App;
