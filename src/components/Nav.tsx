// src/components/Nav.tsx

import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { NavLink, useNavigate } from "react-router-dom";
import "../index.css";
import { logout } from "../features/userSlice"; 

export default function Nav() {
  const user = useAppSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="nav">
      {user.user ? (
        <>
          <NavLink to="/votes">Votes</NavLink>
          {user.user.isAdmin ? <NavLink to="/statistics">Statistics</NavLink> : null}
          <button onClick={handleLogout}>Logout</button>
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
