// src/features/userSlice.ts

import { ActionReducerMapBuilder, createAsyncThunk, createSlice,} from "@reduxjs/toolkit";
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
        return thunkApi.rejectWithValue("Login failed");
      }
      const data = await response.json();
      localStorage.setItem("Authorization", data.token);
      return thunkApi.fulfillWithValue(data.user);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
);

export const fetchProfileUpdate = createAsyncThunk(
  "user/profile",
  async (id: string, thunkApi) => {
    try {
      const token = localStorage.getItem("Authorization");
      const res = await fetch("http://localhost:3000/api/users/profile", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const error = await res.json();
        return thunkApi.rejectWithValue(error);
      }
      return await res.json();
    } catch (err) {
      thunkApi.rejectWithValue("Can't login, please try again");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = DataStatus.IDLE;
      state.error = null;
      localStorage.removeItem("Authorization");
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<userState>) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
        state.user = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCESS;
        state.error = null;
        state.user = action.payload as IUser;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.payload as string;
        state.user = null;
      })
      .addCase(fetchProfileUpdate.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCESS;
        state.error = null;
        state.user = action.payload as IUser;
      })
      .addCase(fetchProfileUpdate.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.payload as string;
        state.user = null;
      })
      .addCase(fetchProfileUpdate.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
        state.user = null;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
