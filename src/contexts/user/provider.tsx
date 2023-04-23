import React, { useState } from "react";

import { UserModel } from "../../models/users/UserModel";
import { UserContext } from "./context";
import { ChallengeModel } from "../../models/challenges/ChallengeModel";

const { Provider } = UserContext;

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserModel>({} as UserModel);
  const [opponent, setOpponent] = useState<UserModel>({} as UserModel);
  const [challenge, setChallenge] = useState<ChallengeModel>(
    {} as ChallengeModel
  );

  const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <Provider
      value={{
        user,
        setUser,
        challenge,
        opponent,
        setOpponent,
        setChallenge,
        isLogged,
        setIsLogged,
      }}
    >
      {children}
    </Provider>
  );
};

export { UserProvider };
