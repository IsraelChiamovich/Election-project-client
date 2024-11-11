// src/components/Register.tsx

import { useEffect } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";

export default function Register() {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      navigate("/votes");
    }
  }, []);
  return <div>Register</div>;
}