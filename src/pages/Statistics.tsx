// src/pages/Statistics.tsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";

export default function Statistics() {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ isLoggedIn: !!user?._id, isAdmin: !!user?.isAdmin });
    if (user?._id && !user?.isAdmin) navigate("/votes");
    if (!user?._id) navigate("/login");
  }, []);
  return <div>Statistics</div>;
}