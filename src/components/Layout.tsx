// src/components/Layout.tsx

import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import "../index.css";

export default function Layout() {
  return (
    <>
      <div className="layout">
        <Nav />

        <main className="content">
          <Outlet />
        </main>

        <footer className="footer">
          <p>&copy; 2023 Election Project. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
