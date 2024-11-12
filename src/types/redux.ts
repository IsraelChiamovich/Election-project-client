// src/types/redux.ts

import { ICandidate } from "./candidates";
import { IUser } from "./user";

export enum DataStatus {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  IDLE = "IDLE",
}

export interface userState {
  error: string | null;
  status: DataStatus;
  user: IUser | null;
}

export interface candidateState {
  error: string | null;
  status: DataStatus;
  candidates: ICandidate[] | null;
}

export interface addVote {
  candidateId: string;
}

export interface updateVote {
  hasVoted: boolean;
  votedFor: string | null;
}
