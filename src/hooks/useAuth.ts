// src/hooks/useAuth.ts

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchLogin, logout } from "../features/userSlice";

export const useAuth = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const login = (username: string, password: string) => {
    dispatch(fetchLogin({ username, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!user) {
      localStorage.removeItem("Authorization");
      handleLogout();
    }
  }, [user]);

  return { user, login, handleLogout };
};
