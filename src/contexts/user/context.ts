import { Dispatch, SetStateAction, createContext } from "react";
import { UserModel } from "../../models/users/UserModel";

interface UserContextProps {
  user: UserModel;
  setUser: Dispatch<SetStateAction<UserModel>>;
  isLogged: boolean;
  logout: () => void;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext({} as UserContextProps);
