import { useContext } from "react";
import { UserContext } from "../contexts/user/context";
import { UserModel } from "../models/users/UserModel";
import { api } from "../services/api";

export function useUser() {
  const context = useContext(UserContext);

  return {
    ...context,
  };
}

export const getUser = async (user_id: string) => {
  const { data } = await api.get<UserModel>(`/users/${user_id}`);

  return data;
};
