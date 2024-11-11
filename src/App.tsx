// src/App.tsx

import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Votes from "./pages/Votes";
import Statistics from "./pages/Statistics";
import "./index.css";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "votes", element: <Votes /> },
      { path: "statistics", element: <Statistics /> },
      { path: "/", element: <Navigate to="/login" /> },
    ],
  },
]);

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
