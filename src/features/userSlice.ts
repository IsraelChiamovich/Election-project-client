// src/features/userSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DataStatus, userState } from "../types/redux";
import { IUser } from "../types/user";

const initialState: userState = {
  error: null,
  status: DataStatus.IDLE,
  user: null,
};

export const fetchLogin = createAsyncThunk(
  "user/login",
  async (user: { username: string; password: string }, thunkApi) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        const error = await response.json();
        return thunkApi.rejectWithValue(error);
      }
      return await response.json();
    } catch (error) {
      return thunkApi.rejectWithValue("Login failed");
    }
  }
);

export const fetchRegister = createAsyncThunk(
  "user/register",
  async ( user: { username: string; password: string; isAdmin: boolean }, thunkApi) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        const error = await response.json();
        return thunkApi.rejectWithValue(error);
      }
      return await response.json();
    } catch (error) {
      return thunkApi.rejectWithValue("Register failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCESS;
        state.user = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.payload as string;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCESS;
        state.user = action.payload as IUser;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
