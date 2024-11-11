// src/types/user.ts

export interface IUser {
    _id: string;
    username: string;
    isAdmin: boolean;
    hasVoted: boolean;
    votedFor?: string;
}