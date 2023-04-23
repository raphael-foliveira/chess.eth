import React, { useState } from "react";

import { UserModel } from "../../models/users/UserModel";
import { UserContext } from "./context";

const { Provider } = UserContext;

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserModel>({} as UserModel);

  const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
      }}
    >
      {children}
    </Provider>
  );
};

export { UserProvider };
