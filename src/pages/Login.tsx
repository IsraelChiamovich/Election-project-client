// src/components/Login.tsx

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchLogin } from "../features/userSlice";
import "../index.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user?._id) {
      navigate("/votes");
    }
  }, [user, navigate]);

  const handleLogin = () => {
    dispatch(fetchLogin({ username, password }));
  };

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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
