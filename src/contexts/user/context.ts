import { Dispatch, SetStateAction, createContext } from "react";
import { ChallengeModel } from "../../models/challenges/ChallengeModel";
import { UserModel } from "../../models/users/UserModel";

interface UserContextProps {
  user: UserModel;
  setUser: Dispatch<SetStateAction<UserModel>>;
  challenge: ChallengeModel;
  setChallenge: Dispatch<SetStateAction<ChallengeModel>>;
  opponent: UserModel;
  setOpponent: Dispatch<SetStateAction<UserModel>>;
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext({} as UserContextProps);
