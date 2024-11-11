// src/components/Nav.tsx

import { RootState, useAppSelector } from "../store/store";
import { NavLink } from "react-router-dom";
import "../index.css"

export default function Nav() {
  const user = useAppSelector((state: RootState) => state.user);

  return (
    <div className="nav">
      {user.user ? (
        <>
          <NavLink to="/votes">Votes</NavLink>
          {user.user.isAdmin && <NavLink to="/statistics">Statistics</NavLink>}
          <button onClick={() => alert("Log out successfully")}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}
    </div>
  );
}
