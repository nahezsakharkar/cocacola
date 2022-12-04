import './App.css';
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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="Login" element={<Login />} />
        <Route element={<Layout />}>
          <Route index path="/" element={<Dashboard />} />
          <Route path="AddNewGroup" element={<AddNewGroup />} />
          <Route path="ShowGroups" element={<ShowGroups />} />
          <Route path="ActiveJobs" element={<ActiveJobs />} />
          <Route path="JobReport" element={<JobReport />} />
          <Route path="Settings" element={<Settings />} />
          <Route path="Account" element={<Account />} />
          <Route path="Logout" element={<Logout />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
