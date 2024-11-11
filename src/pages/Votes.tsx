// src/pages/Votes.tsx

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useNavigate } from "react-router-dom";

export default function Votes() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user?._id) {
        navigate('/login')
    }
  }, []);

  return <div>Votes</div>;
}