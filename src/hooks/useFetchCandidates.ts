// src/hooks/useFetchCandidates.ts

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchCandidates } from "../features/candidatesSlice";

export const useFetchCandidates = () => {
  const { candidates, status, error } = useAppSelector((state) => state.candidates);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  return { candidates, status, error };
};
