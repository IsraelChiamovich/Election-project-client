// src/App.tsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Votes from "./pages/Votes";
import Statistics from "./pages/Statistics";
import Layout from "./components/Layout";
import "./index.css";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/login" />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="votes" element={<Votes />} />
            <Route path="statistics" element={<Statistics />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
