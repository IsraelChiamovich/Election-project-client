// src/pages/VoteCard.tsx

import React from "react";
import { ICandidate } from "../types/candidates";
import { useAppDispatch, useAppSelector } from "../store/store";
import userSlice, {fetchLogin, fetchProfileUpdate} from "../features/userSlice";
import { fetchCandidates } from "../features/candidatesSlice";

interface props {
  candidate: ICandidate;
}

export default function VoteCard({ candidate }: props) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleVote = async () => {
    try {
      const token = localStorage.getItem("Authorization")!;
      const data = await fetch("http://localhost:3000/api/votes", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          candidateId: candidate._id,
          userId: user?._id,
        }),
      });
      dispatch(fetchCandidates());
      dispatch(fetchProfileUpdate(user?._id!));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="vote-card">
      <img src={candidate.image} alt={candidate.name} />
      <h2>{candidate.name}</h2>
      <p>{candidate.votes}</p>
      {!user?.hasVoted && <button onClick={() => handleVote()}>Vote</button>}
      { user?.hasVoted && user?.votedFor== candidate._id ? <p>you vote for me!!!</p>: <p>you didn't vote for me</p>}
    </div>
  );
}
