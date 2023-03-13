import './App.scss';
import { Routes, Route, Navigate } from "react-router-dom";

//importing the layout
import Layout from './layouts/Layout';

// pages -----------------------------------------
import Login from "./pages/Login/Login"
import Dashboard from "./pages/Dashboard/Dashboard"

// add new Group layout
import AddNewGroup from "./pages/Groups/AddNewGroup/AddNewGroup"
import AddGroup from "./pages/Groups/AddNewGroup/AddGroup/AddGroup"
import AddStep from "./pages/Groups/AddNewGroup/AddStep/AddStep"
import AddFilter from "./pages/Groups/AddNewGroup/AddFilter/AddFilter"

// edit Groups layout
import EditGroups from "./pages/Groups/EditGroups/EditGroups"
import EditGroup from "./pages/Groups/EditGroups/EditGroup/EditGroup"
import EditSteps from "./pages/Groups/EditGroups/EditSteps/EditSteps"
import EditFilters from "./pages/Groups/EditGroups/EditFilters/EditFilters"

import ShowGroups from "./pages/Groups/ShowGroups/ShowGroups"
import ActiveJobs from "./pages/Jobs/ActiveJobs/ActiveJobs"
import JobReport from "./pages/Jobs/JobReport/JobReport"
import Logs from './pages/Logs/Logs';
import Settings from "./pages/Settings/Settings"
import Account from "./pages/UserInformation/Account/Account"
import Logout from "./pages/UserInformation/Logout/Logout"
import Error404 from "./pages/Errors/404/404"
import Error500 from "./pages/Errors/500/500"

//helpers
import { LoggedRoute } from './helpers/LoggedRoute';
import { ProtectedRoute } from './helpers/ProtectedRoute';
import { AuthorizedRoute } from './helpers/AuthorizedRoute';

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
          <Route path='AddNewGroup' element={<AuthorizedRoute> <AddNewGroup /> </AuthorizedRoute>} >
            <Route index path="/AddNewGroup/AddGroup" element={<AddGroup />} />
            <Route path="/AddNewGroup/AddStep" element={<AddStep />} />
            <Route path="/AddNewGroup/AddFilter" element={<AddFilter />} />
          </Route>
          <Route path="ShowGroups" element={<ShowGroups />} />
          <Route path='ShowGroups/EditGroups' element={<EditGroups />} >
            <Route index path="/ShowGroups/EditGroups/EditGroup" element={<EditGroup />} />
            <Route path="/ShowGroups/EditGroups/EditSteps" element={<EditSteps />} />
            <Route path="/ShowGroups/EditGroups/EditFilters" element={<EditFilters />} />
          </Route>
          <Route path="ActiveJobs" element={<ActiveJobs />} />
          <Route path="JobReport" element={<JobReport />} />
          <Route path="Logs" element={<Logs />} />
          <Route path="Settings" element={<AuthorizedRoute> <Settings /> </AuthorizedRoute>} />
          <Route path="Account" element={<AuthorizedRoute> <Account /> </AuthorizedRoute>} />
        </Route>
        <Route path="Error500" element={<Error500 />} />
        <Route path="Error404" element={<Error404 />} />
        <Route path="*" element={<Navigate to="Error404" replace />} />
      </Routes>
    </div>
  );
}

export default App;
