import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

//importing the layout
import Layout from './layouts/Layout';

// pages -----------------------------------------
import Login from "./pages/Login/Login"
import Dashboard from "./pages/Dashboard/Dashboard"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="Login" element={<Login />} />
        <Route element={<Layout />}>
          <Route index path="/" element={<Dashboard />} />
          {/* <Route path="Admins" element={<Admins />} />
          <Route path="Houses" element={<Houses />} />
          <Route path="Families" element={<Families />} />
          <Route path="Members" element={<Members />} /> */}
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
