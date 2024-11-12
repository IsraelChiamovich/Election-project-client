// src/components/VoteCard.tsx

import React from "react";
import { ICandidate } from "../types/candidates";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchProfileUpdate } from "../features/userSlice";
import { useFetchCandidates } from "../hooks/useFetchCandidates";

interface props {
  candidate: ICandidate;
}

export default function VoteCard({ candidate }: props) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleVote = async () => {
    try {
      const token = localStorage.getItem("Authorization")!;
      await fetch("http://localhost:3000/api/votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          candidateId: candidate._id,
          userId: user?._id,
        }),
      });
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
      {!user?.hasVoted && <button onClick={handleVote}>Vote</button>}
      {user?.hasVoted && user.votedFor === candidate._id ? (
        <p>You voted for this candidate!</p>
      ) : (
        <p>You didn't vote for this candidate</p>
      )}
    </div>
  );
}
