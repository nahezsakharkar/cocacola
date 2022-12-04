import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

//importing the layout
import Layout from './layouts/Layout';

// pages -----------------------------------------
import Login from "./pages/Login/Login"
import Dashboard from "./pages/Dashboard/Dashboard"
import AddNewGroup from "./pages/Groups/AddNewGroup/AddNewGroup"
import ShowGroups from "./pages/Groups/ShowGroups/ShowGroup"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="Login" element={<Login />} />
        <Route element={<Layout />}>
          <Route index path="/" element={<Dashboard />} />
          <Route path="AddNewGroup" element={<AddNewGroup />} />
          <Route path="ShowGroups" element={<ShowGroups />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
