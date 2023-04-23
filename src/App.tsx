import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Challenge from "./components/challenge/Challenge";

import Board from "./components/game/Board";
import { useUser } from "./hooks/useUser";
import { Auth } from "./components/auth/Auth";

function App() {
  const { isLogged } = useUser();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <ToastContainer />
      {isLogged ? (
        <>
          <Board gameId={"FRIZ2S2r"} />
          <Challenge />
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
