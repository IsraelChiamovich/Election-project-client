// src/pages/VoteCard.tsx

import { ICandidate } from "../types/candidates";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchProfileUpdate, updateVotes } from "../features/userSlice";
import { fetchCandidates } from "../features/candidatesSlice";
import { socket } from "../main";

interface props {
  candidate: ICandidate;
}

export default function VoteCard({ candidate }: props) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleVote = async () => {
    try {
      const token = localStorage.getItem("Authorization")!;
      const res = await fetch("http://localhost:3000/api/votes", {
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
      if (!res.ok) {
        throw new Error("Failed to vote");
      }
      socket.emit("newVote", candidate._id);
      dispatch(updateVotes({hasVoted:true, votedFor:candidate._id}))
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="vote-card">
      <img src={candidate.image} alt={candidate.name} />
      <h2>{candidate.name}</h2>
      <p className="votes-count">{candidate.votes}</p>
      {!user?.hasVoted && <button onClick={() => handleVote()}>Vote</button>}
      {user?.hasVoted && user?.votedFor == candidate._id ? (
        <p className="you-voted">you vote for me!!!</p>
      ) : (
        <p className="you-didnt-voted">you didn't vote for me</p>
      )}
    </div>
  );
}
