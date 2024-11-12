// src/pages/Votes.tsx

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useNavigate } from "react-router-dom";
import { fetchCandidates } from "../features/candidatesSlice";
import VoteCard from "./VoteCard";

export default function Vote() {
  const {user} = useAppSelector((state)=> state.user)
  const {candidates} = useAppSelector((state)=> state.candidates)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id){navigate('/login')}
    dispatch(fetchCandidates())
  }, [user]);

  return (
    <div className="votes">
      <h1>Votes</h1>
      <div className="vote-cards">
        {candidates!.map((candidate) => (
          <VoteCard key={candidate._id} candidate={candidate} />
        ))}
      </div>
    </div>
    
  )
}