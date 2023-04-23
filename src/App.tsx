import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Challenge from "./components/challenge/Challenge";

import Board from "./components/game/Board";
import { useUser } from "./hooks/useUser";
import { Auth } from "./components/auth/Auth";
import { useEffect, useState } from "react";
import { createSession, useAuth } from "./hooks/useAuth";

function App() {
  const { logout, signInOponnet } = useAuth();
  const { isLogged } = useUser();
  const [gameId, setGameId] = useState<string>("DQ74QL3p");
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    signInOponnet();

    //lip_sbywVZGnBYMbA4SFfZTl
  }, []);

  const setAuth = () => {
    setIsAuth(true);
  };

  const comeback = () => {
    setIsAuth(false);
  };

  const goAuth = () => {
    setIsAuth(true);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <ToastContainer />
      {isLogged ? (
        <>
          <button className="appButton" onClick={logout}>
            Logout
          </button>
          <Challenge gameId={gameId} />
          <Board gameId={gameId} />
        </>
      ) : (
        <>
          {isAuth ? (
            <>
              <button className="appButton" onClick={comeback}>
                Comeback
              </button>
              <Auth setAuth={setAuth} />
            </>
          ) : (
            <>
              <button className="appButton" onClick={goAuth}>
                Go Auth
              </button>
              <Board gameId={gameId} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
