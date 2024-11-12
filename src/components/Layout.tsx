// src/components/Layout.tsx

import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import "../index.css";
import { RootState, useAppSelector } from "../store/store";

export default function Layout() {
  const user = useAppSelector((state: RootState) => state.user.user);
  return (
    <>
      {/* {user ? <div>{JSON.stringify(user)}</div> : null} */}
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
