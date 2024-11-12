// src/App.tsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Votes from "./pages/Votes";
import Statistics from "./pages/Statistics";
import Layout from "./components/Layout";
import "./index.css";
import { socket } from "./main";
import { addVotes } from "./features/candidatesSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addVote } from "./types/redux";


export default function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    const handlePublishVote = (candidateid:addVote) => {
      dispatch(addVotes(candidateid))
    }
    socket.on("updateVotes", handlePublishVote)
    return () => {
      socket.off("updateVotes", handlePublishVote)
    }
  }, [socket])
  
  return (
    <div className="App">
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/login" />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="votes" element={<Votes />} />
            <Route path="statistics" element={<Statistics />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
