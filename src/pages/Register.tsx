// src/components/Register.tsx

import { useEffect, useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";

export default function Register() {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          isAdmin,
        }),
      });
      if (!response.ok) throw new Error("faild to register");
      else {
        console.log(await response.json());
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };
  useEffect(() => {
    if (user?._id) {
      navigate("/votes");
    }
  }, []);

  return (
    <div className="register">
      <input
        type="text"
        placeholder="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label className="isAdmin">
        <input
          type="checkbox"
          id="isAdmin"
          name="isAdmin"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
        Admin
      </label>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
