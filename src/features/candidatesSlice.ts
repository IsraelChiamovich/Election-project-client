// src/features/candidatesSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { candidateState, DataStatus } from "../types/redux";

const initialState: candidateState = {
  error: null,
  status: DataStatus.IDLE,
  candidates: [],
};

export const fetchCandidates = createAsyncThunk(
  "candidates/fetch",
  async (_, thunkApi) => {
    try {
      const token = localStorage.getItem("Authorization");
      const res = await fetch("http://localhost:3000/api/candidates", {
        headers: {
          Authorization: token!,
        },
        });
      if (!res.ok) {
        const error = await res.json();
        return thunkApi.rejectWithValue(error);
      }
      return await res.json();
    } catch (error) {
      return thunkApi.rejectWithValue("Failed to fetch candidates");
    }
  }
);

const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCESS;
        state.candidates = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.payload as string;
      });
  },
});

export default candidatesSlice.reducer;
