// src/store/store.ts

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import candidatesReducer from "../features/candidatesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        user: userReducer,
        candidates: candidatesReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;