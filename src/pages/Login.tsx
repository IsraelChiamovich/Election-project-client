// src/components/Login.tsx

import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { fetchLogin } from "../features/userSlice";
import "../index.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const user = useAppSelector((state: RootState) => state.user.user); 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!user?._id) return;
    navigate("/votes");
  }, [user]);

  return (
    <div className="login">
      <input
        type="text"
        placeholder="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => dispatch(fetchLogin({ username, password }))}>Login</button>
    </div>
  );
}
